import { MedicamentoDTO } from "./medicamento.dto";

export interface FarmaciaDTO {
    id: string,
    datasistema: Date,
    dosagem: string,
    quantidade: string, 
    quantidadetotal: string,
    datavencimento: Date,
    valor: string, 
    valortotal: string,
    medicamento?: MedicamentoDTO,
}