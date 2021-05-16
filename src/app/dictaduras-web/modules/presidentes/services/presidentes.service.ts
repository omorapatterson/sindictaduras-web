import { Injectable } from '@angular/core';
import {ErrorHandlingHttpService, RequestOptions} from '../../../../../common/error-handling/services/error-handling-http.service';
//
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
//
import { ConfigService } from '../../../../../common/config/services/config.service';
import {Presidente, PresidenteResponse, PresidentesResponse} from '../models/presidente';
import {HttpHeadersInterceptorService} from '../../../../../common/error-handling/interceptors/http-headers-interceptor.service';

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
        protected httpHeaders: HttpHeadersInterceptorService,
        private http: ErrorHandlingHttpService) {
            this.apiEndpoint = this.configService.apiUrl + this.configService.config.apiConfigs.presidentes.apiEndpoint;
    }

    getPresidentes(): Observable<PresidentesResponse> {
        const requestOptions: RequestOptions = { headers: this.httpHeaders.getHeaders() };
        requestOptions.headers = requestOptions.headers.delete('Content-Type');
        return this.http.get<PresidentesResponse>(this.apiEndpoint, requestOptions);
    }

    getPresidente(presidenteId: string): Observable<PresidenteResponse> {
        return this.http.get<PresidenteResponse>(this.apiEndpoint + presidenteId);
    }

    postCreatePresidente(presidente: Presidente): Observable<PresidenteResponse> {
        return this.http.post<PresidenteResponse>(this.apiEndpoint, presidente);
    }

    putEditPresidente(presidente: Presidente): Observable<PresidenteResponse> {
        return this.http.put<PresidenteResponse>(this.apiEndpoint, presidente);
    }
}

