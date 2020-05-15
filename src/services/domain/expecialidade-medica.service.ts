import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { ExpedicalidadeMedicaDTO } from "../../modules/expecialidade-medica.dto";

@Injectable()
export class ExpecialidadeMedicaService{
    constructor(public http: HttpClient) {
    }

    findAll1(): Observable<ExpedicalidadeMedicaDTO[]>  {
        return this.http.get<ExpedicalidadeMedicaDTO[]>(`${API_CONFIG.baseUrl}/expecialidademedico`);
    }
    findAll(expmedico_id: string): Observable<ExpedicalidadeMedicaDTO[]>  {
        return this.http.get<ExpedicalidadeMedicaDTO[]>(`${API_CONFIG.baseUrl}/expecialidademedico/${expmedico_id}`);
    }


    insert(obj: ExpedicalidadeMedicaDTO){
        return this.http.post(`${API_CONFIG.baseUrl}/expecialidademedico`,
        obj,
        {   
           observe: "response",
           responseType: "text"
        }
      )
    }
    
}