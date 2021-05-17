import { Injectable } from '@angular/core';
import { ErrorHandlingHttpService } from '../../../../../common/error-handling/services/error-handling-http.service';
//
import { BehaviorSubject, Observable } from 'rxjs';
//
import { ConfigService } from '../../../../../common/config/services/config.service';
import { Usuario, UsuarioResponse } from '../models/usuario';
import {LoginResponse} from '../../../../../common/authentication/models/loginResponse';

export const ASCENDING = 'asc';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

    apiEndpoint: string;

    previousFilter: any = {};

    previousSortColumn: string = 'updatedAt';

    previousSortDirection: string = 'desc';

    previousPageIndex: number = 0;

    previousPageSize: number = 10;

    constructor(
        private configService: ConfigService,
        private http: ErrorHandlingHttpService) {
            this.apiEndpoint = this.configService.apiUrl + this.configService.config.apiConfigs.usuarios.apiEndpoint;
    }

    registrarUsuario(usuario: Usuario): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(this.apiEndpoint + 'registro/', usuario);
    }

    confirmarUsuario(codigo): Observable<LoginResponse> {
        return this.http
            .post<LoginResponse>(this.apiEndpoint + 'confirmar/', codigo);
    }
}

