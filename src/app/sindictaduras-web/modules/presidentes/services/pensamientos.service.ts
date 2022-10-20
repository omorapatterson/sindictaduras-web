import { Injectable } from '@angular/core';
import {ErrorHandlingHttpService, RequestOptions} from '../../../../../common/error-handling/services/error-handling-http.service';
//
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
//
import { ConfigService } from '../../../../../common/config/services/config.service';
import { Presidente, PresidenteResponse, PresidentesResponse } from '../models/presidente';
import { HttpHeadersInterceptorService } from '../../../../../common/error-handling/interceptors/http-headers-interceptor.service';

export const ASCENDING = 'asc';

@Injectable({
  providedIn: 'root'
})
export class PensamientosService {

    apiEndpoint: string;

    previousFilter: any = {};

    previousSortColumn: string = 'updatedAt';

    previousSortDirection: string = 'desc';

    previousPageIndex: number = 0;

    previousPageSize: number = 10;

    public presidentesList = new BehaviorSubject<PresidentesResponse>({ dataCount: 0, data: [] });

    constructor(
        private configService: ConfigService,
        protected httpHeaders: HttpHeadersInterceptorService,
        private http: ErrorHandlingHttpService) {
            this.apiEndpoint = this.configService.apiUrl + this.configService.config.apiConfigs.pensamientos.apiEndpoint;
    }

    getPensamientos(): Observable<any> {
        return this.http.get<any>(this.apiEndpoint);
    }
}

