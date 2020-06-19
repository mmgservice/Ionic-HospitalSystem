import { PacienteDTO } from './../../modules/paciente.dto';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { API_CONFIG } from '../../config/api.config';

@Injectable()
export class PacienteService{
    constructor(public http: HttpClient){

    }

    findAll(): Observable<PacienteDTO[]>  {
        return this.http.get<PacienteDTO[]>(`${API_CONFIG.baseUrl}/pacientes`);
    }

    insert(obj: PacienteDTO){
        return this.http.post(`${API_CONFIG.baseUrl}/pacientes`,
        obj,
        {
            observe: "response",
            responseType: "text"
        }
      );
    }

    update(paciente: PacienteDTO) {
        return this.http.put(`${API_CONFIG.baseUrl}/pacientes/${paciente.id}`, paciente);
      }
    
      deletar(id) : Observable<PacienteDTO[]>  {
            return this.http.delete<PacienteDTO[]>(`${API_CONFIG.baseUrl}/pacientes/${id}`);
      }
}