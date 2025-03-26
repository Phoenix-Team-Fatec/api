import { AreaAtuacao } from "../entities/AreaAtuacao";
import { AppDataSource } from "../../ormconfig";
import { Projeto } from "../entities/Projeto";

export class AreaAtuacaoService{

    private areaAtuacaoRepository = AppDataSource.getRepository(AreaAtuacao);
    private ProjetoRepository = AppDataSource.getRepository(Projeto);

   
    //função para criar área de atuação
    async createAreaAtuacao(area_atuacao_nome:string):Promise<AreaAtuacao>{

        const area_atuacao = this.areaAtuacaoRepository.create({area_atuacao_nome})

        return await this.areaAtuacaoRepository.save(area_atuacao)
    }

    //função para selecionar áreas de atuações
    async getAreaAtuacao():Promise<AreaAtuacao[]>{

         return await this.areaAtuacaoRepository.find();
    } 

    //função para selecionar áreas de atuações
    async getAreaAtuacaoById(area_atuacao_id:number):Promise<AreaAtuacao>{

        const area_atuacao = this.areaAtuacaoRepository.findOneBy({area_atuacao_id})

        if(area_atuacao){
            return await area_atuacao
        }
   } 



   async getAreaAtuacaoByProjetoId(proj_id: number): Promise<AreaAtuacao | null> {
    const projeto = await this.ProjetoRepository.findOne({
        where: { proj_id },
        relations: ["area_atuacao"] // Carrega a relação corretamente
    });

    return projeto ? projeto.area_atuacao : null;
}


    //função para deletar área de atuação
    async deleteAreaAtuacao(area_atuacao_id:number):Promise<AreaAtuacao>{

        const area_atuacao = await this.areaAtuacaoRepository.findOneBy({area_atuacao_id})

        if (area_atuacao){
            return await this.areaAtuacaoRepository.remove(area_atuacao)
        }
    }

    //função para atualizar uma área de atuação
    async updateAreaAtuacao(area_atuacao_id:number, area_atuacao_nome:string):Promise<AreaAtuacao>{

        const area_atuacao = await this.areaAtuacaoRepository.findOneBy({area_atuacao_id})

        if (area_atuacao){
            area_atuacao.area_atuacao_nome = area_atuacao_nome;
        }

        return await this.areaAtuacaoRepository.save(area_atuacao)
    }
}