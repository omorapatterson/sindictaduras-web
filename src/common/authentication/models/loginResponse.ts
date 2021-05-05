import {Usuario} from '../../../app/dictaduras-web/modules/usuarios/models/usuario';

export class LoginResponse {
    data: {
        token: string;
        usuario: Usuario;
    }
}
