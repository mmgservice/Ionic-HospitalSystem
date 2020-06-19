import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CategoriaExameDTO } from "../../modules/categoriaexame.dto";
import { Observable } from "rxjs";
import { API_CONFIG } from "../../config/api.config";

@Injectable()
export class CategoriaExameService{
    constructor(public http: HttpClient){

    }

    findAll(): Observable<CategoriaExameDTO[]>{
        return this.http.get<CategoriaExameDTO[]>(`${API_CONFIG.baseUrl}/categoriaexames`);
    }

    insert(obj: CategoriaExameDTO){
        return this.http.post(`${API_CONFIG.baseUrl}/categoriaexames`,
        obj,
        {
            observe: "response",
            responseType: "text"
        }
      );
  }

  update(categoria: CategoriaExameDTO) {
        return this.http.put(`${API_CONFIG.baseUrl}/categoriaexames/${categoria.id}`, categoria);  
    }

    deletar(id) : Observable<CategoriaExameDTO[]>  {
        return this.http.delete<CategoriaExameDTO[]>(`${API_CONFIG.baseUrl}/categoriaexames/${id}`);
    }
}