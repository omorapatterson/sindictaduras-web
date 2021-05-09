import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import {environment} from '../../../environments/environment';
//


@Injectable({
	providedIn: 'root',
})
export class WebsocketVotacionService {
	topic = '/topic/actualizarVotacion';
	data: any = null;
	stompClient: any;
	enviarMensaje = new BehaviorSubject(this.data);

	public apiUrl: string = environment.apiUrl;

	constructor() {}

	public conectarAlWebSocket() {
		try {
			const webSocket = new SockJS(this.apiUrl + 'ws');
			this.stompClient = Stomp.over(webSocket);
			const miContexto = this;
			miContexto.stompClient.connect(
				{},
				(frame) => {
					miContexto.stompClient.subscribe(miContexto.topic, (mensaje) => {
						if(mensaje !== undefined && mensaje !== null){
							miContexto.data = mensaje;
							miContexto.enviarMensaje.next(mensaje.body);
						}
					});
				},
				this.errorAlConectar,
			);
		} catch (error) {
			// no hacer nada
		}
	}

	errorAlConectar(error) {
		setTimeout(() => {
			this.conectarAlWebSocket();
		}, 5000);
	}
}
