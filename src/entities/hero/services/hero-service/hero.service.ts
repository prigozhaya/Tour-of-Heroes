import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { md5 } from 'js-md5';
import { catchError, Observable, of, tap } from 'rxjs';
import { MessageService } from '../../../../shared/services/messages/message.service';
import { Hero, HeroResponse } from '../../model/hero';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  private publicKey = 'bf3884b86b57e6b573a568fb9aac2ef1';
  private privateKey = 'eda3675fde68637a016004f473c0678df0d945e1';
  private ts = '1';
  private hash = md5(this.ts + this.privateKey + this.publicKey);
  private heroesUrl = 'https:/gateway.marvel.com/v1/public/characters';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  private log(message: string, error?: boolean) {
    this.messageService.add({ text: `HeroService: ${message}`, error });
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`, true);
      return of(result as T);
    };
  }

  getHeroes(offset: number): Observable<HeroResponse> {
    const params = new HttpParams()
      .set('limit', 6)
      .set('offset', offset)
      .set('ts', this.ts)
      .set('apikey', this.publicKey)
      .set('hash', this.hash);
    return this.http.get<HeroResponse>(this.heroesUrl, { params }).pipe(
      tap((_) => this.log(`fetched heroes`)),
      catchError(this.handleError<HeroResponse>('getHeroes', {}))
    );
  }
  searchHeroes(term: string, offset: number): Observable<HeroResponse> {
    const params = new HttpParams()
      .set('limit', 6)
      .set('offset', offset)
      .set('nameStartsWith', term)
      .set('ts', this.ts)
      .set('apikey', this.publicKey)
      .set('hash', this.hash);
    return this.http.get<HeroResponse>(this.heroesUrl, { params }).pipe(
      tap((x) =>
        x
          ? this.log(`found heroes matching "${term}"`)
          : this.log(`no heroes matching "${term}"`, true)
      ),
      catchError(this.handleError<HeroResponse>('searchHeroes'))
    );
  }

  getHero(id: number): Observable<HeroResponse> {
    const params = new HttpParams()
      .set('ts', this.ts)
      .set('apikey', this.publicKey)
      .set('hash', this.hash);
    return this.http
      .get<HeroResponse>(`${this.heroesUrl}/${id}`, { params })
      .pipe(
        tap((_) => this.log(`fetched hero id=${id}`)),
        catchError(this.handleError<HeroResponse>(`getHero id=${id}`))
      );
  }

  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((_) => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  deleteHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap((_) => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }
}
