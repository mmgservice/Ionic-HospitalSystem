import { MedicoDTO } from "./medico.dto";
import { PacienteDTO } from "./paciente.dto";
import { NomeExameDTO } from "./nomeexame.dto";

export interface ExameDTO{
  id: string,
  datasistema: Date,
  dataexame: Date,
  nomedoexame: NomeExameDTO,
  statusExameId: string,
  paciente: PacienteDTO,
  medico: MedicoDTO

}