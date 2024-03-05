import { Injectable } from '@angular/core';
import { Observable, catchError, retry } from 'rxjs';
import { Cliente } from '../interfaces/cliente.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { EndPoint } from 'src/shared/constants/hero/constants';
import { ErrorService } from 'src/shared/services/error-control.service';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private baseUrl : string = environment.serverUriApi 
  constructor(private http: HttpClient,
              private httpError : ErrorService
    ) { }

  getClientes():Observable<Cliente[]>{
    console.log(`${this.baseUrl + EndPoint.Cliente}`)

    return this.http
    .get<Cliente[]>(`${this.baseUrl + EndPoint.Cliente}`)
    .pipe(retry(0),catchError(this.httpError.messageError))

  }





  
}
