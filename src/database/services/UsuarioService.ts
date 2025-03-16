import { Repository } from "typeorm";
import { AppDataSource } from "../../ormconfig";
import { Usuario } from "../entities/Usuario";

export class UsuarioService {
  private usuarioRepository: Repository<Usuario>;

  constructor() {
    this.usuarioRepository = AppDataSource.getRepository(Usuario);
  }

  async createUsuario(data: Partial<Usuario>): Promise<Usuario> {
    const usuario = this.usuarioRepository.create(data);
    return await this.usuarioRepository.save(usuario);
  }

  async getUsuarios(): Promise<Usuario[]> {
    return await this.usuarioRepository.find();
  }
  
  async getUsuarioById(id: number): Promise<Usuario | null> {
    return await this.usuarioRepository.findOneBy({ user_id: id });
  }

  async getUsuarioByEmail(email: string): Promise<Usuario | null> {
    return await this.usuarioRepository.findOneBy({ user_email: email });
  }

  async updateUsuario(id: number, data: Partial<Usuario>): Promise<Usuario | null> {
    await this.usuarioRepository.update(id, data);
    return await this.getUsuarioById(id);
  }

  async deleteUsuario(id: number): Promise<void> {
    await this.usuarioRepository.delete(id);
  }
}