import { ExpecialidadeEnfermagemDTO } from "./expenfermagem.dto";

export interface EnfermagemDTO{
    id: string,
    nome: string,
    coren: string,
    expecialidade: ExpecialidadeEnfermagemDTO,
}