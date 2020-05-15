import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MedicoDTO } from "../../modules/medico.dto";
import { Observable } from "rxjs";
import { API_CONFIG } from "../../config/api.config";

@Injectable()
export class MedicoService{
    constructor(public http: HttpClient){

    }


    findAll(): Observable<MedicoDTO[]>  {
        return this.http.get<MedicoDTO[]>(`${API_CONFIG.baseUrl}/medicos`);
    }

    insert(obj: MedicoDTO){
        return this.http.post(`${API_CONFIG.baseUrl}/medicos`,
        obj,
        {
            observe: "response",
            responseType: "text"
        }
      );
  }
    
}
