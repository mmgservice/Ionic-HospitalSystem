import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { UsuarioDTO } from "../modules/usuario.dto";
import { API_CONFIG } from "../config/api.config";

@Injectable()
export class UsuarioService{

    constructor(public http: HttpClient){

    }

    findAll(): Observable<UsuarioDTO[]>{
        return this.http.get<UsuarioDTO[]>(`${API_CONFIG.baseUrl}/usuarios`);
    }

    insert(obj: UsuarioDTO){
        return this.http.post(`${API_CONFIG.baseUrl}/usuarios`,
        obj,
        {
            observe: "response",
            responseType: "text"
        }
      )
    }
}