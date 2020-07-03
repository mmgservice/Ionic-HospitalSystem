import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { PrescricaoDTO } from "../../modules/prescricao.dto";
import { API_CONFIG } from "../../config/api.config";



@Injectable()
export class PrescricaoService{
    constructor(public http: HttpClient){

    }
    findAll(): Observable<PrescricaoDTO[]>{
        return this.http.get<PrescricaoDTO[]>(`${API_CONFIG.baseUrl}/prescricao`);
    }
    insert(obj: PrescricaoDTO){
        return this.http.post(`${API_CONFIG.baseUrl}/prescricao`,
        obj,
        {
            observe: "response",
            responseType: "text"
        }
      )
    }
    deletar(id): Observable<PrescricaoDTO[]>{
        return this.http.delete<PrescricaoDTO[]>(`${API_CONFIG.baseUrl}/prescricao${id}`);
    }
    update(prescricao: PrescricaoDTO){
        return this.http.put(`${API_CONFIG.baseUrl}/prescricao/${prescricao.id}`, prescricao);
    }
}