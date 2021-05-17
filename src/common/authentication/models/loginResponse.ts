import {Usuario} from '../../../app/sindictaduras-web/modules/usuarios/models/usuario';

export class LoginResponse {
    data: {
        token: string;
        usuario: Usuario;
    }
}
