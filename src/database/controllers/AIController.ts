// controllers/AIController.ts
import { Request, Response } from 'express';
import { TarefaService } from '../services/tarefas_service';
import OllamaService from '../services/OllamaService';

class AIController {
    private tarefaService = new TarefaService();

    constructor() {
    this.handleChat = this.handleChat.bind(this); // <-- Adicionado bind
  }

  async handleChat(req: Request, res: Response) {
    try {
    console.log('Body recebido:', req.body); // Adicione este log
    const { message } = req.body;
    console.log('Mensagem processada:', message);
      // Processar a mensagem com a IA
      const aiResponse = await OllamaService.processMessage(message);
      console.log(aiResponse)
      let responseMessage = '';

      switch(aiResponse.action) {
        case 'complete_task':
          if (aiResponse.taskId) {
            const taskId = parseInt(aiResponse.taskId);
            const updatedTask = await this.tarefaService.updateStatus(taskId, true);
            responseMessage = `Tarefa #${taskId} "${updatedTask.tarefa_nome}" concluída`;
          }
          break;

        case 'uncomplete_task':
          if (aiResponse.taskId) {
            const taskId = parseInt(aiResponse.taskId);
            const updatedTask = await this.tarefaService.updateStatus(taskId, false);
            responseMessage = `Tarefa #${taskId} "${updatedTask.tarefa_nome}" desmarcada`;
          }
          break;

        // controllers/AIController.ts
        case 'complete_etapa':
          if (aiResponse.etapaNome) {
            const count = await this.tarefaService.completeAllByEtapa(aiResponse.etapaNome);
            responseMessage = `Todas tarefas da etapa "${aiResponse.etapaNome}" foram concluídas`;
          }
          break;

          case 'list_overdue':
            const overdueTasks = await this.tarefaService.getOverdueTasks();
            responseMessage = overdueTasks.length > 0 
              ? `Tarefas atrasadas:\n${overdueTasks.map(t => 
                  `#${t.tarefa_id} ${t.tarefa_nome} (${new Date(t.tarefa_data_fim).toLocaleDateString()})` // <-- Garantir conversão
                ).join('\n')}`
              : 'Nenhuma tarefa atrasada';
            break;

        default:
          responseMessage = 'Não entendi o comando. Por favor, tente novamente.';
      }

           res.status(200).json({ 
        success: true,
        message: responseMessage
      });
      
    } catch (error) {
      console.error('Erro no AIController:', error);
      res.status(500).json({ 
        success: false,
        error: 'Erro ao processar solicitação',
        details: error.message 
      });
    }
  }
}


export default new AIController();