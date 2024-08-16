import { Inject, Injectable } from '@angular/core';
// import { HEROES } from './mock-heroes';
import { Hero, HeroResponse } from './heroes/hero';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { MessageService } from './message.service';
import { md5 } from 'js-md5';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) {}

  private publicKey = 'bf3884b86b57e6b573a568fb9aac2ef1';
  private privateKey = 'eda3675fde68637a016004f473c0678df0d945e1';
  private ts = '1';
  private hash = md5(this.ts + this.privateKey + this.publicKey);
  private heroesUrl = 'https://gateway.marvel.com/v1/public/characters?orderBy=name';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  getHeroes(): Observable<HeroResponse> {
    const params = new HttpParams().set("ts", this.ts).set("apikey", this.publicKey).set("hash", this.hash)
    return this.http.get<HeroResponse>(this.heroesUrl, {params})
    .pipe(
      catchError(this.handleError<HeroResponse>('getHeroes', {}))
    );
  }

  getHero(id: number): Observable<Hero> {
    return this.http.get<Hero>(`${this.heroesUrl}/${id}`).pipe(tap(_ => this.log(`fetched hero id=${id}`)), catchError(this.handleError<Hero>(`getHero id=${id}`)))
  }

  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
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
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found heroes matching "${term}"`) :
         this.log(`no heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }
}
