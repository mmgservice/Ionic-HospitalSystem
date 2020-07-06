import { MedicoDTO } from "./medico.dto";
import { PacienteDTO } from "./paciente.dto";
import { NomeExameDTO } from "./nomeexame.dto";

export interface ExameDTO{
  id: string,
  datasistema: string,
  dataexame: string,
  horario: string,
  nomedoexame: NomeExameDTO,
  statusExameId: string,
  paciente: PacienteDTO,
  medico: MedicoDTO

}