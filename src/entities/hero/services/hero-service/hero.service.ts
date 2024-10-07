import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeroResponse } from '@shared/model/hero';
import { MessageService } from '@shared/services/messages/message.service';
import { md5 } from 'js-md5';
import { catchError, Observable, of, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private hash = md5(
    environment.ts + environment.privateKey + environment.publicKey
  );
  private heroesUrl = 'https:/gateway.marvel.com/v1/public/characters';

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  public getHeroes(offset: number): Observable<HeroResponse> {
    const params = new HttpParams()
      .set('limit', 6)
      .set('offset', offset)
      .set('ts', environment.ts)
      .set('apikey', environment.publicKey)
      .set('hash', this.hash);
    return this.http.get<HeroResponse>(this.heroesUrl, { params }).pipe(
      tap((_) => {
        this.log(`fetched heroes`);
      }),
      catchError(this.handleError<HeroResponse>('getHeroes', {}))
    );
  }
  public searchHeroes(term: string, offset: number): Observable<HeroResponse> {
    const params = new HttpParams()
      .set('limit', 6)
      .set('offset', offset)
      .set('nameStartsWith', term)
      .set('ts', environment.ts)
      .set('apikey', environment.publicKey)
      .set('hash', this.hash);
    return this.http.get<HeroResponse>(this.heroesUrl, { params }).pipe(
      tap((searchHeroes) => {
        searchHeroes
          ? this.log(`found heroes matching "${term}"`)
          : this.log(`no heroes matching "${term}"`, true);
      }),
      catchError(this.handleError<HeroResponse>('searchHeroes'))
    );
  }

  public getHero(id: number): Observable<HeroResponse> {
    const params = new HttpParams()
      .set('ts', environment.ts)
      .set('apikey', environment.publicKey)
      .set('hash', this.hash);
    return this.http
      .get<HeroResponse>(`${this.heroesUrl}/${id}`, { params })
      .pipe(
        tap((_) => {
          this.log(`fetched hero id=${id}`);
        }),
        catchError(this.handleError<HeroResponse>(`getHero id=${id}`))
      );
  }

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
}
