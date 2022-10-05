export class Usuario {
  id?: string;
  idToken?: string;
  nombre?: string;
  apellido?: string;
  email?: string;
  usuario?: string;
  contrasena?: string;
  reseteoContrasena?: boolean;
  validado?: boolean;
  activo?: boolean;
  signInWithSocialNetwork?: boolean;

  constructor(usuario: any) {
    this.id = usuario.idToken;
    this.idToken = usuario.idToken;
    this.nombre = usuario.name;
    this.apellido = usuario.lastName;
    this.email = usuario.email;
    this.usuario = usuario.email;
    this.contrasena = usuario.id;
    this.signInWithSocialNetwork = true;
  }
}


export class UsuariosResponse {
  data: Usuario[];
  dataCount: number;
}

export class UsuarioResponse {
  data: Usuario;
}
