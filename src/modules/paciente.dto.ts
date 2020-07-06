import { EstadoDTO } from "./estado.dto";
import { AlergiaDTO } from "./alergia.dto";
import { CidadeDTO } from "./cidade.dto";

export interface PacienteDTO{
	id: string,
	datasistema: string,
	nome: string,
    sobrenome: string,
	datanascimento: string,
    idade: number,
    rg: string,
	cpf: string,
	sexo: string,
	cor: string,
	endereco: string,
	complemento: string,
	cep: string,
	bairro: string,
	estadocivil: string,
	obs: string,
    telefone1:string,
    telefone2:string,
    telefone3:string,
	nomedamae: string,
	nomedopai: string,
	cidade: CidadeDTO,
	estado: EstadoDTO,
	alergia: AlergiaDTO,
	tipoSanguineoId: string,
	residenciaId: string,
}