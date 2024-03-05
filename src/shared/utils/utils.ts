import {  FormGroup } from '@angular/forms';
import { ConstantString } from '../constants/general/general';

declare let iziToast: any;

export function clearForm(form: FormGroup, control: string) {
    form.get(control)?.setValue('');
  }

  export function getErrorMessage(form: any, control: string) {
    return getMsgError(form.get(control).errors);
  }

  export function getMsgError(errors: any) {
    let msg;
    if (errors != null) {
      if (errors.required) {
        msg = ConstantString.Required;
      }
      if (errors.email) {
        msg = ConstantString.EmailInvalid;
      }
      if (errors.minlength != null) {
        msg = ConstantString.MinCharacters.replace(
          '{0}',
          errors.minlength.requiredLength
        );
      }
      if (errors.maxlength != null) {
        msg = ConstantString.MaxCharacters.replace(
          '{0}',
          errors.maxlength.requiredLength
        );
      }
      if (errors.pattern != null) {
        msg = ConstantString.FormatInvalid;
      }
      if (errors.min != null) {
        msg = ConstantString.MinValid.replace('{0}', errors.min.min);
      }
      if (errors.max != null) {
        msg = ConstantString.MaxValid.replace('{0}', errors.max.max);
      }
      if (errors.matDatepickerMin?.min?._d) {
        msg = ConstantString.MinValid.replace(
          '{0}',
          dateToString(errors.matDatepickerMin.min._d)
        );
      }
      if (errors.matDatepickerMax?.max?._d) {
        msg = ConstantString.MaxValid.replace(
          '{0}',
          dateToString(errors.matDatepickerMax.max._d)
        );
      }
    }
    return msg;
  }

  export function dateToString(date: Date) {
    return (
      date.getDate() +
      '/' +
      (date.getMonth() + 1).toString() +
      '/' +
      date.getFullYear()
    );
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