from flask import Flask, request, jsonify
import requests
import json
import logging
from functools import wraps
from flask_cors import CORS
from typing import Dict, Any, Optional

# Configuração básica de logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

# Configurações (deveriam vir de variáveis de ambiente)
APP_CONFIG = {
    "NODE_API_URL": "http://localhost:3000/projeto",
    "OLLAMA_URL": "http://localhost:11434/api/generate",
    "OLLAMA_MODEL": "gemma:2b",
    "REQUEST_TIMEOUT": 30
}

def handle_errors(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        try:
            return f(*args, **kwargs)
        except json.JSONDecodeError as e:
            logger.error(f"JSON decode error: {str(e)}")
            return jsonify({"error": "Invalid JSON response from AI"}), 500
        except requests.RequestException as e:
            logger.error(f"Request error: {str(e)}")
            return jsonify({"error": "Service communication failed"}), 503
        except Exception as e:
            logger.error(f"Unexpected error: {str(e)}")
            return jsonify({"error": "Internal server error"}), 500
    return wrapper

def call_ollama(prompt: str) -> Dict[str, Any]:
    """Chama o modelo Ollama com tratamento robusto"""
    try:
        response = requests.post(
            APP_CONFIG["OLLAMA_URL"],
            json={
                "model": APP_CONFIG["OLLAMA_MODEL"],
                "prompt": prompt,
                "stream": False
            },
            timeout=APP_CONFIG["REQUEST_TIMEOUT"]
        )
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        logger.error(f"Ollama request failed: {str(e)}")
        raise

def create_project(params: Dict[str, Any]) -> str:
    """Cria um projeto com validação"""
    if not params.get("nome") or not params.get("descricao"):
        raise ValueError("Nome e descrição são obrigatórios")
    
    project_data = {
        "proj_nome": params["nome"],
        "proj_descricao": params["descricao"]
    }

    response = requests.post(
        APP_CONFIG["NODE_API_URL"],
        json=project_data,
        headers={"Content-Type": "application/json"},
        timeout=APP_CONFIG["REQUEST_TIMEOUT"]
    )
    response.raise_for_status()
    
    return f"Projeto '{params['nome']}' criado com sucesso"

def compare_tasks(params) -> str:
    """Compara tarefas com validação"""
    if len(params) != 2:
        raise ValueError("São necessários exatamente dois projetos para comparação")
    return f"Comparando '{params[0]}' e '{params[1]}'"

def list_projects(_=None) -> str:
    """Lista projetos"""
    return "Lista de todos os projetos"

FUNCTIONS = {
    "criar_projeto": create_project,
    "comparar_tarefas": compare_tasks,
    "listar_projetos": list_projects
}

def generate_ai_prompt(message: str) -> str:
    """Gera o prompt para a IA de forma mais limpa"""
    examples = [
        {
            "input": "Crie um projeto com o nome Teste a descricao é teste mesmo",
            "output": '{"funcao": "criar_projeto", "parametros": {"nome": "Teste", "descricao": "teste mesmo"}}'
        },
        {
            "input": "Crie um projeto com o nome IA funcionou a descricao é Ia deu certo",
            "output": '{"funcao": "criar_projeto", "parametros": {"nome": "IA funcionou", "descricao": "Ia deu certo"}}'
        }
    ]
    
    examples_str = "\n".join(
        f'Frase: "{ex["input"]}"\nResposta: {ex["output"]}'
        for ex in examples
    )
    
    return f"""
    Transforme a frase abaixo em um JSON válido com as chaves 'funcao' e 'parametros'.
    Use apenas o formato dos exemplos:

    {examples_str}

    Frase: "{message}"
    """

@app.route("/interpretar", methods=["POST"])
@handle_errors
def interpret():
    data = request.get_json()
    if not data or "comando" not in data:
        return jsonify({"error": "Comando não fornecido"}), 400
    
    command = data["comando"]
    if not isinstance(command, str) or not command.strip():
        return jsonify({"error": "Comando inválido"}), 400

    # Chama a IA
    prompt = generate_ai_prompt(command)
    ai_response = call_ollama(prompt)
    
    try:
        instruction = json.loads(ai_response["response"])
        function_name = instruction["funcao"]
        parameters = instruction.get("parametros", {})
        
        if function_name not in FUNCTIONS:
            return jsonify({"error": f"Função '{function_name}' não suportada"}), 400
            
        result = FUNCTIONS[function_name](parameters)
        return jsonify({"resultado": result})
        
    except KeyError as e:
        logger.error(f"Resposta da IA mal formatada: {ai_response}")
        return jsonify({"error": "Resposta da IA inesperada"}), 500

if __name__ == "__main__":
    app.run(port=5000, debug=True)