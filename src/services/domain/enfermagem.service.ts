import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { API_CONFIG } from "../../config/api.config";
import { EnfermagemDTO } from "../../modules/enfermagem.dto";

@Injectable()
export class EnfermagemService{
    id: any;
    constructor(public http: HttpClient){

    }

    findAll(): Observable<EnfermagemDTO[]>  {
        return this.http.get<EnfermagemDTO[]>(`${API_CONFIG.baseUrl}/enfermagem`);
    }

    insert(obj: EnfermagemDTO){
        return this.http.post(`${API_CONFIG.baseUrl}/enfermagem`,
        obj,
        {
            observe: "response",
            responseType: "text"
        }
      );
  }

  update(enfermagem: EnfermagemDTO) {
    return this.http.put(`${API_CONFIG.baseUrl}/enfermagem/${enfermagem.id}`, enfermagem);
  }

  deletar(id): Observable<EnfermagemDTO[]>{
    return this.http.delete<EnfermagemDTO[]>(`${API_CONFIG.baseUrl}/enfermagem/${id}`);
} 
    
}