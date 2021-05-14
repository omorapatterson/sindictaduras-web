import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//
import { Observable } from 'rxjs';
//
import { HttpHeadersInterceptorService } from '../../../../common/error-handling/interceptors/http-headers-interceptor.service';
import { RequestOptions } from '../../../../common/error-handling/services/error-handling-http.service';
import { ConfigService } from '../../../../common/config/services/config.service';


@Injectable({
	providedIn: 'root',
})
export class ImagesService {

	apiEndpoint: string;

	constructor(
		private configService: ConfigService,
		private http: HttpClient,
		private httpHeaders: HttpHeadersInterceptorService,
	) {
		this.apiEndpoint = this.configService.apiUrl + this.configService.config.apiConfigs.files.apiEndpoint;
	}

	postImagenPresidente(file: File, presidenteId: string): Observable<any> {
		const requestOptions: RequestOptions = { headers: this.httpHeaders.getHeaders() };
		requestOptions.headers = requestOptions.headers.delete('Content-Type');
		const formData = new FormData();
		formData.append('file', file);
		return this.http.post<any>(this.apiEndpoint + 'presidente/' + presidenteId, formData, requestOptions);
	}
}
