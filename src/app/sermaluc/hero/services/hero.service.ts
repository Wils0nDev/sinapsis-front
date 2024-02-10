import { Injectable } from '@angular/core';
import { Observable, catchError, retry } from 'rxjs';
import { Hero } from '../interfaces/heroe.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { EndPoint } from 'src/shared/constants/hero/constants';
import { ErrorService } from 'src/shared/services/error-control.service';


@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private baseUrl : string = environment.serverUriApi 
  constructor(private http: HttpClient,
              private httpError : ErrorService
    ) { }

  getHeroes():Observable<Hero[]>{

    return this.http
    .get<Hero[]>(`${this.baseUrl + EndPoint.Heros}`)
    .pipe(retry(0),catchError(this.httpError.messageError))

  }

  getHeroById( id: string ): Observable<Hero|undefined> {
    return this.http.get<Hero>(`${this.baseUrl + EndPoint.Heros}${id}`)
           .pipe(retry(0),catchError(this.httpError.messageError))
  }

  addHeroes(hero:Hero):Observable<Hero>{
    delete hero.id
    return this.http
    .post<Hero>(`${this.baseUrl + EndPoint.Heros}`, hero)
    .pipe(retry(0),catchError(this.httpError.messageError))

  }

  updateHero(hero: Hero) : Observable<Hero> {

    

    return this.http.patch<Hero>(`${this.baseUrl + EndPoint.Heros}${hero.id}`,hero)
                    .pipe(retry(0),catchError(this.httpError.messageError))
  }

  deleteHero(id: string) : Observable<boolean> {

    return this.http.delete<boolean>(`${this.baseUrl + EndPoint.Heros}${id}`)
                    .pipe(retry(0),catchError(this.httpError.messageError))
  }

  
}
