import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CategoriaExameDTO } from "../modules/categoriaexame.dto";
import { API_CONFIG } from "../config/api.config";




@Injectable()
export class CategoriaMedicamentoService{
    constructor(
                public http: HttpClient
               ){

    }

    findAll(): Observable<CategoriaExameDTO[]>{
        return this.http.get<CategoriaExameDTO[]>(`${API_CONFIG.baseUrl}/categoriamedicamentos`);
    }
    insert(obj: CategoriaExameDTO){
        return this.http.post(`${API_CONFIG.baseUrl}/categoriamedicamentos`,
        obj,
        {
            observe: "response",
            responseType: "text"
        }
      )
    }
    update(categoriamedicamento : CategoriaExameDTO){
        return this.http.put(`${API_CONFIG.baseUrl}/categoriamedicamentos/${categoriamedicamento.id}`, categoriamedicamento);
    }
    delete(id){
        return this.http.delete(`${API_CONFIG.baseUrl}/categoriamedicamentos/${id}`);
    }
}