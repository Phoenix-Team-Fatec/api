// services/OllamaService.ts
import axios from 'axios';

class OllamaService {
 static async processMessage(message: string) {
 const prompt = `
SISTEMA: Você é um assistente especialista em tarefas. 
Siga estas regras:

1. Analise a mensagem e responda APENAS com JSON
2. Ações válidas: complete_task, uncomplete_task, complete_etapa, list_overdue
3. IDs são sempre números inteiros
4. Ignore texto irrelevante

Exemplos:
---
Usuário: "Finalize a tarefa 12"
Resposta: {"action": "complete_task", "taskId": 12}

Usuário: "Desmarque a tarefa 5"
Resposta: {"action": "uncomplete_task", "taskId": 5}

Usuário: "Conclua todas da etapa Desenvolvimento"
Resposta: {"action": "complete_etapa", "etapaNome": "Desenvolvimento"}

Usuário: "Conclua todas da etapa 1"
Resposta: {"action": "complete_etapa", "etapaNome": "1"}

Usuário: "Finalize as tarefas da etapa Revisão"
Resposta: {"action": "complete_etapa", "etapaNome": "Revisão"}


Usuário: "Tarefas atrasadas?"
Resposta: {"action": "list_overdue"}
---

Mensagem atual: "${message}"
Resposta (APENAS JSON):`;
  
  try {
    console.log('Enviando prompt para Ollama:', prompt); // Log do prompt enviado
    
    const response = await axios.post('http://localhost:11434/api/generate', {
      model: 'gemma:2b',
      prompt: prompt,
      format: 'json',
      stream: false
    });

    console.log('Resposta bruta do Ollama:', response.data.response); // Log da resposta
    
    const parsedResponse = JSON.parse(response.data.response);
    console.log('Resposta parseada:', parsedResponse);
    
    return parsedResponse;
  } catch (error) {
    console.error('Erro detalhado no OllamaService:', {
      errorMessage: error.message,
      responseData: error.response?.data
    });
    throw error; // Propague o erro para o controller
  }
}
}

export default OllamaService;