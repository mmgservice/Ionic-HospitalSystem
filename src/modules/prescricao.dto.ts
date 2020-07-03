import { Time } from "@angular/common";
import { MedicoDTO } from "./medico.dto";
import { EnfermagemDTO } from "./enfermagem.dto";

export interface PrescricaoDTO{
    id: string,
    datasistema: Date,
    via: string,
    freq: string,
    horario1: string,
    horario2: string,
    horario3: string,
    horario4: string,
    horario5: string,
    horario6: string,
    medico?: MedicoDTO,
    enfermagem?: EnfermagemDTO
}