import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { EnfermagemDadosDTO } from "../../modules/enfermagemdados.dto";
import { Observable } from "rxjs";
import { API_CONFIG } from "../../config/api.config";

@Injectable()
export class EnfermagemDadosService{
    constructor(public http: HttpClient){

    }

    findAll(): Observable<EnfermagemDadosDTO[]>  {
        return this.http.get<EnfermagemDadosDTO[]>(`${API_CONFIG.baseUrl}/enfermagem`);
    }

    insert(obj: EnfermagemDadosDTO){
        return this.http.post(`${API_CONFIG.baseUrl}/enfermagem`,
        obj,
        {
            observe: "response",
            responseType: "text"
        }
      );
  }
    
}