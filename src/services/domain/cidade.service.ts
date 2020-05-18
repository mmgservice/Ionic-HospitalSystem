import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CidadeDTO } from "../../modules/cidade.dto";
import { API_CONFIG } from "../../config/api.config";



@Injectable()
export class CidadeService{
    constructor(public http: HttpClient) {
    }
    findAll(): Observable<CidadeDTO[]>{
        return this.http.get<CidadeDTO[]>(`${API_CONFIG.baseUrl}/cidades`);
    }
    findCidade(estado_id : string) : Observable<CidadeDTO[]>  {
        return this.http.get<CidadeDTO[]>(`${API_CONFIG.baseUrl}/estados/${estado_id}/cidades`);
    }
    insert(obj: CidadeDTO){
        return this.http.post(`${API_CONFIG.baseUrl}/cidades`,
        obj,
        {
            observe: "response",
            responseType: "text"
        }
      )
    }
}