import {Presidente} from '../../presidentes/models/presidente';

export class Votacion {

  spresidente: string;

  like: boolean

  disLike: boolean;

  dictator: boolean;

  presidente: Presidente

  constructor(spresidente: string) {
    this.spresidente = spresidente;
    this.like = false;
    this.disLike = false;
    this.dictator = false;
  }
}
