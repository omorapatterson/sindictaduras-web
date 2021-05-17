import { Injectable } from '@angular/core';
import { ErrorHandlingHttpService } from '../../../../../common/error-handling/services/error-handling-http.service';
//
import { BehaviorSubject, Observable } from 'rxjs';
//
import { ConfigService } from '../../../../../common/config/services/config.service';
import { Votacion } from '../models/votacion';

export const ASCENDING = 'asc';

@Injectable({
  providedIn: 'root'
})
export class VotacionService {

    apiEndpoint: string;

    previousFilter: any = {};

    previousSortColumn: string = 'updatedAt';

    previousSortDirection: string = 'desc';

    previousPageIndex: number = 0;

    previousPageSize: number = 10;

    constructor(
        private configService: ConfigService,
        private http: ErrorHandlingHttpService) {
            this.apiEndpoint = this.configService.apiUrl + this.configService.config.apiConfigs.votacion.apiEndpoint;
    }

    realizarVotacion(votacion: Votacion): Observable<any> {
        return this.http.post<any>(this.apiEndpoint, votacion);
    }

    cargarVotacion(presidenteId: string): Observable<any> {
        return this.http.get<any>(this.apiEndpoint + 'cargarVotacion/' + presidenteId);
    }
}

