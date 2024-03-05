import { Injectable } from '@angular/core';
import { Observable, catchError, retry } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { EndPoint } from 'src/shared/constants/hero/constants';
import { ErrorService } from 'src/shared/services/error-control.service';
import { Mensaje, sendFilter } from '../interfaces/mensaje.interface';


@Injectable({
  providedIn: 'root'
})
export class FiltroService {

  private baseUrl : string = environment.serverUriApi 
  constructor(private http: HttpClient,
              private httpError : ErrorService
    ) { }

  getMessages(filter:sendFilter):Observable<Mensaje[]>{

    return this.http
    .post<Mensaje[]>(`${this.baseUrl +'mensaje/'+ EndPoint.Filter}`, filter)
    .pipe(retry(0),catchError(this.httpError.messageError))

  }

  
}
