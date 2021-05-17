import {Presidente} from '../../presidentes/models/presidente';
import {Votacion} from '../../votacion/models/votacion';

export interface MostrarPresidenteDialogData {

  titleKey?: string;

  messageKey?: string;

  messageParam?: any;

  okBtnKey?: string;

  cancelBtnKey?: string;

  okBtnColor?: string;

  contentStyle: any;

  presidente?: Presidente;

  votacion?: Votacion;
}
