import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MedicoDadosDTO } from "../../modules/medicodados.dto";
import { Observable } from "rxjs";
import { API_CONFIG } from "../../config/api.config";

@Injectable()
export class MedicoDadosService{
    constructor(public http: HttpClient){

    }


    findAll(): Observable<MedicoDadosDTO[]>  {
        return this.http.get<MedicoDadosDTO[]>(`${API_CONFIG.baseUrl}/medicos`);
    }

    insert(obj: MedicoDadosDTO){
        return this.http.post(`${API_CONFIG.baseUrl}/medicos`,
        obj,
        {
            observe: "response",
            responseType: "text"
        }
      );
  }
    
}
