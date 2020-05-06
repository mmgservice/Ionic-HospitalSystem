import { EstadoDTO } from "./estado.dto";

export interface CidadDTO{
        id: string,
        nome: string
        estado?:EstadoDTO;
}