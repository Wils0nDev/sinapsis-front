import {  FormGroup } from '@angular/forms';

declare let iziToast: any;

export function clearForm(form: FormGroup, control: string) {
    form.get(control)?.setValue('');
  }


  export function showWarning(ParamMsg: any) {
    iziToast.warning({
      title: 'Validación',
      message: ParamMsg,
      position: 'bottomCenter',
      zindex: 14000,
      transitionOut: 'fadeOutDown',
    });
  }
  
  export function showSuccess(ParamMsg: any) {
    iziToast.success({
      title: 'Listo!',
      message: ParamMsg,
      position: 'bottomCenter',
      timeout: 10000,
      zindex: 14000,
      transitionOut: 'fadeOutDown',
    });
  }
  
  export function showInfo(ParamMsg: any) {
    iziToast.info({
      class: 'infoToast',
      title: 'Info',
      message: ParamMsg,
      position: 'bottomCenter',
      close: false,
      zindex: 14000,
      timeout: 10000,
      displayMode: 2,
    });
  }