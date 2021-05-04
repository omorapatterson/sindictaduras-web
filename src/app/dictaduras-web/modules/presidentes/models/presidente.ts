export class Presidente {
  id?: string;
  sid?: string;
  nombre?: string;
  apellido?: string;
  foto?: string;
  description?: string;
  imgUrl?: string;
  updatedAt?: string;
  createdAt?: string;
}

export class PresidentesResponse {
  data: Presidente[];
  dataCount: number;
}

export class PresidenteResponse {
  data: Presidente;
}
