import {Presidente} from '../../presidentes/models/presidente';

export interface MostrarPresidenteDialogData {

  titleKey?: string;

  messageKey?: string;

  messageParam?: any;

  okBtnKey?: string;

  cancelBtnKey?: string;

  okBtnColor?: string;

  contentStyle: any;

  presidente?: Presidente;
}
