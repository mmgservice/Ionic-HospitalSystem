import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ExpecialidadeEnfermagemDTO } from "../../modules/expenfermagem.dto";
import { Observable } from "rxjs";
import { API_CONFIG } from "../../config/api.config";

@Injectable()
export class ExpecialidadeEnfermagemService{
    constructor(public http: HttpClient) {
    }

    findAll(): Observable<ExpecialidadeEnfermagemDTO[]>  {
        return this.http.get<ExpecialidadeEnfermagemDTO[]>(`${API_CONFIG.baseUrl}/expecialidadeenfermagem`);
    }

    insert(obj: ExpecialidadeEnfermagemDTO){
        return this.http.post(`${API_CONFIG.baseUrl}/expecialidadeenfermagem`,
        obj,
        {   
           observe: "response",
           responseType: "text"
        }
      )
      }
}