import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ExameDTO } from "../../modules/exame.dto";
import { Observable } from "rxjs";
import { API_CONFIG } from "../../config/api.config";


@Injectable()
export class ExameService{

    constructor(public http: HttpClient){

    }

    findAll(): Observable<ExameDTO[]>  {
        return this.http.get<ExameDTO[]>(`${API_CONFIG.baseUrl}/exames`);
    }

    insert(obj: ExameDTO){
        return this.http.post(`${API_CONFIG.baseUrl}/exames`,
        obj,
        {
            observe: "response",
            responseType: "text"
        }
      );
    }

    update(exame: ExameDTO) {
        return this.http.put(`${API_CONFIG.baseUrl}/exames/${exame.id}`, exame);
      }
    
      deletar(id) : Observable<ExameDTO[]>  {
            return this.http.delete<ExameDTO[]>(`${API_CONFIG.baseUrl}/exames/${id}`);
      }

}