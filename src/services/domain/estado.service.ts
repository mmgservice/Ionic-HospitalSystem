import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { EstadoDTO } from "../../modules/estado.dto";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs";


@Injectable()
export class EstadoService{
    constructor(public http: HttpClient) {
    }

    insert(obj: EstadoDTO){
        return this.http.post(`${API_CONFIG.baseUrl}/estados`,
        obj,
        {
            observe: "response",
            responseType: "text"
        }
      )
    }

    findAll() : Observable<EstadoDTO[]>  {
        return this.http.get<EstadoDTO[]>(`${API_CONFIG.baseUrl}/estados`);
    }
    deletar(id) : Observable<EstadoDTO[]>  {
        return this.http.delete<EstadoDTO[]>(`${API_CONFIG.baseUrl}/estados/${id}`);
    }
    findById(estado_id : string) : Observable<EstadoDTO[]>  {
        return this.http.get<EstadoDTO[]>(`${API_CONFIG.baseUrl}/estados/${estado_id}`);
    }
   
}

