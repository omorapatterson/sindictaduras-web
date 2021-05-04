import { Injectable } from '@angular/core';
import { ErrorHandlingHttpService } from '../../../../../common/error-handling/services/error-handling-http.service';
//
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
//
import { ConfigService } from '../../../../../common/config/services/config.service';
import { Presidente, PresidentesResponse } from '../models/presidente';

export const ASCENDING = 'asc';

@Injectable({
  providedIn: 'root'
})
export class PresidentesService {

    apiEndpoint: string;

    previousFilter: any = {};

    previousSortColumn: string = 'updatedAt';

    previousSortDirection: string = 'desc';

    previousPageIndex: number = 0;

    previousPageSize: number = 10;

    public presidentesList = new BehaviorSubject<PresidentesResponse>({ dataCount: 0, data: [] });

    constructor(
        private configService: ConfigService,
        private http: ErrorHandlingHttpService) {
            this.apiEndpoint = this.configService.apiUrl + this.configService.config.apiConfigs.presidentes.apiEndpoint;
    }

    getPresidentes(): Observable<PresidentesResponse> {
        return this.http.get<PresidentesResponse>(this.apiEndpoint);
    }
}

