import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CidadeDTO } from "../../modules/cidade.dto";
import { API_CONFIG } from "../../config/api.config";
import { QuartoDTO } from "../../modules/quarto.dto";



@Injectable()
export class QuartoService{
    constructor(public http: HttpClient) {
    }
    findAll(): Observable<QuartoDTO[]>{
        return this.http.get<QuartoDTO[]>(`${API_CONFIG.baseUrl}/quartos`);
    }

    update(quarto: QuartoDTO){
        return this.http.put(`${API_CONFIG.baseUrl}/quartos/${quarto.id}`, quarto);
    }
    
    insert(obj: QuartoDTO){
        return this.http.post(`${API_CONFIG.baseUrl}/quartos`,
        obj,
        {
            observe: "response",
            responseType: "text"
        }
      )

    }
}