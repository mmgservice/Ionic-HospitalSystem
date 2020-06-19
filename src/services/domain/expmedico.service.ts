import { ExpedicalidadeMedicaDTO } from './../../modules/expmedica.dto';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_CONFIG } from "../../config/api.config";


@Injectable()
export class ExpecialideMedicoService{
    
    constructor(public http: HttpClient) {
}

findAll(): Observable<ExpedicalidadeMedicaDTO[]>  {
    return this.http.get<ExpedicalidadeMedicaDTO[]>(`${API_CONFIG.baseUrl}/expecialidademedicos`);
}
insert(obj: ExpedicalidadeMedicaDTO){
    return this.http.post(`${API_CONFIG.baseUrl}/expecialidademedicos`,
    obj,
    {   
       observe: "response",
       responseType: "text"
    }
  )
  }

  update(exp: ExpedicalidadeMedicaDTO) {
    return this.http.put(`${API_CONFIG.baseUrl}/expecialidademedicos/${exp.id}`, exp);
  }

  deletar(id) : Observable<ExpedicalidadeMedicaDTO[]>  {
    return this.http.delete<ExpedicalidadeMedicaDTO[]>(`${API_CONFIG.baseUrl}/expecialidademedicos/${id}`);
  }
}