import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { API_CONFIG } from "../../config/api.config";
import { LeitoDTO } from "../../modules/leito.dto";



@Injectable()
export class LeitoService{
    constructor(public http: HttpClient) {
    }
    findAll(): Observable<LeitoDTO[]>{
        return this.http.get<LeitoDTO[]>(`${API_CONFIG.baseUrl}/leitos`);
    }
   
    insert(obj: LeitoDTO){
        return this.http.post(`${API_CONFIG.baseUrl}/leitos`,
        obj,
        {
            observe: "response",
            responseType: "text"
        }
      )
    }
}