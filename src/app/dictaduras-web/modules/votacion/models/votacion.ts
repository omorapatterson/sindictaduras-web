
export class Votacion {

  spresidente: string;

  like: boolean

  disLike: boolean;

  isADictador: boolean;


  constructor(spresidente: string, voto: string) {
    this.spresidente = spresidente;
    this.like = (voto === 'like');
    this.disLike = (voto === 'disLike');
    this.isADictador = (voto === 'isADictador');
  }
}
