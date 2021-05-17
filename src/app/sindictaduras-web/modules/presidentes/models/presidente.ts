export class Presidente {
  id?: string;
  sid?: string;
  nombre?: string;
  apellidos?: string;
  foto?: string;
  descripcion?: string;
  biografia?: string;
  mandatos?: string;
  likeCount?: number;
  disLikeCount?: number;
  dictatorCount?: number;
  pais?: string;
  paisCode?: string;
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
