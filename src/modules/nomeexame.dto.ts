import { CategoriaExameDTO } from './categoriaexame.dto';

export interface NomeExameDTO{
    id: string,
    nomedoexame: string,
    valor:string,
    categoria?: CategoriaExameDTO
}