import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { PaisDTO } from "../../modules/pais.dto";


@Injectable()
export class PaisService {

    constructor(public http: HttpClient) {
    }

    findAll() : Observable<PaisDTO[]>  {
        return this.http.get<PaisDTO[]>(`${API_CONFIG.baseUrl}/pais`);
    }
}