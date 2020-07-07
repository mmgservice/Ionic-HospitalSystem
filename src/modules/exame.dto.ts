import { MedicoDTO } from "./medico.dto";
import { PacienteDTO } from "./paciente.dto";
import { NomeExameDTO } from "./nomeexame.dto";
import { CategoriaExameDTO } from "./categoriaexame.dto";

export interface ExameDTO{
  id: string,
  datasistema: string,
  dataexame: string,
  nomeexame: NomeExameDTO,
  statusExameId: string,
  paciente: PacienteDTO,
  medico: MedicoDTO

}