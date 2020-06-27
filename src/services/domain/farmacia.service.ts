import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { FarmaciaDTO } from "../../modules/farmacia.dto";
import { API_CONFIG } from "../../config/api.config";


@Injectable()
export class FarmaciaService{
    constructor(
        public http: HttpClient
    ) {

    }
    findAll(): Observable<FarmaciaDTO[]>{
        return this.http.get<FarmaciaDTO[]>(`${API_CONFIG.baseUrl}/farmacia`);
    }
    insert(obj: FarmaciaDTO){
        return this.http.post(`${API_CONFIG.baseUrl}/farmacia`,
        obj,
        {
            observe: "response",
            responseType: "text"
        }
      )
    }
    update(farmacia : FarmaciaDTO){
        return this.http.put(`${API_CONFIG.baseUrl}/farmacia${farmacia.id}`,farmacia);
    }
    deletar(id) : Observable<FarmaciaDTO[]>  {
        return this.http.delete<FarmaciaDTO[]>(`${API_CONFIG.baseUrl}/farmacia/${id}`);
    }
}