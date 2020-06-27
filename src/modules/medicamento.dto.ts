import { CatMedicamentoDTO } from "./catmedicamento.dto";

export interface MedicamentoDTO{
    id: string,
    nome: string,
    categoriamedicamento?: CatMedicamentoDTO
}