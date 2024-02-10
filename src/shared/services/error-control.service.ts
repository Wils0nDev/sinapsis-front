

import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EndPoint } from 'src/shared/constants/hero/constants';


@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }

  messageError(error:HttpErrorResponse) {
    return throwError(() => `Ocurrio un Erro `)
  }
}
