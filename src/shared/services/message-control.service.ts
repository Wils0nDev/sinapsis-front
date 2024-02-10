import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EnumSnackBarType, SnackBarData } from '../interfaces/snackbar.interface';
import { SnackbarComponent } from "src/app/components/snackbar/snackbar.component";

@Injectable({
  providedIn: 'root'
})
export class MessageControlService {

  constructor(private matSnackBar: MatSnackBar) {}
  ShowSuccess = (ParamMsg: any) => {
    const inputData: SnackBarData = {
      Message: ParamMsg,
      Type: EnumSnackBarType.SUCCESS
    };
    this.matSnackBar.openFromComponent(SnackbarComponent, {
      duration: 10000,
      panelClass: ['success-snackbar'],
      data: inputData
    });
  }

  ShowInfo = (ParamMsg: any) => {
    const snackbarData: SnackBarData = {
      Message: ParamMsg,
      Type: EnumSnackBarType.INFO
    };
    this.matSnackBar.openFromComponent(SnackbarComponent, {
      duration: 10000,
      panelClass: ['info-snackbar'],
      data: snackbarData
    });
  }

  ShowWarning = (ParamMsg: any) => {
    const snackbarData: SnackBarData = {
      Message: ParamMsg,
      Type: EnumSnackBarType.WARNING
    };
    this.matSnackBar.openFromComponent(SnackbarComponent, {
      duration: 10000,
      panelClass: ['warning-snackbar'],
      data: snackbarData
    });
  }

  ShowError = (ParamMsg: any) => {
    const snackbarData: SnackBarData = {
      Message: ParamMsg,
      Type: EnumSnackBarType.ERROR
    };
    this.matSnackBar.openFromComponent(SnackbarComponent, {
      duration: 10000,
      panelClass: ['error-snackbar'],
      data: snackbarData
    });
  }
  
}
