import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { MedicamentoDTO } from "../../modules/medicamento.dto";
import { API_CONFIG } from "../../config/api.config";




@Injectable()
export class MedicamentoService{
    constructor(
                public http: HttpClient
               ){

    }
    findAll(): Observable<MedicamentoDTO[]>{
    return this.http.get<MedicamentoDTO[]>(`${API_CONFIG.baseUrl}/medicamentos`);
    }
    insert(obj: MedicamentoDTO){
        return this.http.post(`${API_CONFIG.baseUrl}/medicamentos`,
        obj,
        {
            observe: "response",
            responseType: "text"
        }
      )
    }

    update(medicamento : MedicamentoDTO){
        return this.http.put(`${API_CONFIG.baseUrl}/medicamentos/${medicamento.id}`, medicamento);
    }

    delete(id): Observable<MedicamentoDTO[]> {
        return this.http.delete<MedicamentoDTO[]>(`${API_CONFIG.baseUrl}/medicamentos/${id}`);
    }
    
}