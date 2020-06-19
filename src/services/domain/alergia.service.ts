import { HttpClient } from "@angular/common/http";import { Observable } from "rxjs";
import { AlergiaDTO } from "../../modules/alergia.dto";
import { API_CONFIG } from "../../config/api.config";
import { Injectable } from "@angular/core";

@Injectable()
export class AlergiaService{
    constructor(public http: HttpClient){

    }

    findAll(): Observable <AlergiaDTO[]>{
        return this.http.get<AlergiaDTO[]>(`${API_CONFIG.baseUrl}/alergias`);
    }

    insert(obj: AlergiaDTO){
          return this.http.post(`${API_CONFIG.baseUrl}/alergias`,
          obj,
          {
              observe: "response",
              responseType: "text"
          }
        );
  
    }

    findById(alergia_id : string) : Observable<AlergiaDTO[]>  {
        return this.http.get<AlergiaDTO[]>(`${API_CONFIG.baseUrl}/alergia/${alergia_id}`);
    }

    update(alergia: AlergiaDTO) {
        return this.http.put(`${API_CONFIG.baseUrl}/alergias/${alergia.id}`, alergia);  
    }

    deletar(id) : Observable<AlergiaDTO[]>  {
        return this.http.delete<AlergiaDTO[]>(`${API_CONFIG.baseUrl}/alergias/${id}`);
    }
}