
export class Votacion {

  spresidente: string;

  like: boolean

  disLike: boolean;

  dictator: boolean;

  constructor(spresidente: string, voto: string) {
    this.spresidente = spresidente;
    this.like = (voto === 'like');
    this.disLike = (voto === 'disLike');
    this.dictator = (voto === 'dictator');
  }
}
