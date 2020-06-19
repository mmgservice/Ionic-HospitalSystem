import { NomeExameDTO } from './../../modules/nomeexame.dto';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { API_CONFIG } from "../../config/api.config";

@Injectable()
export class NomeExameService{
    constructor(public http: HttpClient){

    }
    findAll(): Observable<NomeExameDTO[]>  {
        return this.http.get<NomeExameDTO[]>(`${API_CONFIG.baseUrl}/nomeexames`);
    }

    insert(obj: NomeExameDTO){
        return this.http.post(`${API_CONFIG.baseUrl}/nomeexames`,
        obj,
        {
            observe: "response",
            responseType: "text"
        }
      );
    }

    update(nomeExame: NomeExameDTO) {
        return this.http.put(`${API_CONFIG.baseUrl}/nomeexames/${nomeExame.id}`, nomeExame);
      }
    
      deletar(id) : Observable<NomeExameDTO[]>  {
            return this.http.delete<NomeExameDTO[]>(`${API_CONFIG.baseUrl}/nomeexames/${id}`);
      }
        

    }