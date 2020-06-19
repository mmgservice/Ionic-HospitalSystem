import { ExpedicalidadeMedicaDTO } from './expmedica.dto';

export interface MedicoDTO{
    id: string,
    nome: string,
    crm: string,
    expecialidade?: ExpedicalidadeMedicaDTO
}