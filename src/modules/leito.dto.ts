import { QuartoDTO } from "./quarto.dto";

export interface LeitoDTO{
    id: string,
    nomequarto: string,
    statusquartoenum: string,
    quarto?: QuartoDTO
}