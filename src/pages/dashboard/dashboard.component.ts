import { Component, OnInit } from '@angular/core';
import { Hero } from '@shared/model';
import { map, Observable, tap } from 'rxjs';
import { FavoritesService } from '../../entities/hero/services/favorites-service/favorites.service';
import { HeroService } from '../../entities/hero/services/hero-service/hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  public heroes$!: Observable<Hero[]>;
  public loading = false;
  public page = 1;
  public maxPage = 1;
  public searchValue = '';

  constructor(
    private heroService: HeroService,
    private favoritesService: FavoritesService
  ) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  public setPage(step: number): void {
    this.page += step;
    if (!this.searchValue) {
      this.getHeroes();
    } else {
      this.searchHeroes();
    }
  }

  public setFavorite(hero: Hero): void {
    this.favoritesService.setFavorite(hero);
  }

  public removeFavorite(id: number): void {
    this.favoritesService.removeFavorite(id);
  }

  public setSearchValue(searchValue: string): void {
    if (this.searchValue === searchValue) {
      return;
    } else {
      this.page = 1;
      this.searchValue = searchValue;
    }

    if (!this.searchValue) {
      this.getHeroes();
    } else {
      this.searchHeroes();
    }
  }

  getHeroes(): void {
    this.loading = true;

    this.heroes$ = this.heroService.getHeroes((this.page - 1) * 6).pipe(
      tap((response) => {
        this.maxPage = response.data?.total
          ? Math.ceil(response.data?.total / 6)
          : 1;
      }),
      map((heroes) =>
        heroes?.data?.results
          ? this.favoritesService.compareFavorites(heroes?.data?.results)
          : []
      ),
      tap(() => {
        this.loading = false;
      })
    );
  }

  searchHeroes(): void {
    this.loading = true;
    this.heroes$ = this.heroService
      .searchHeroes(this.searchValue, (this.page - 1) * 6)
      .pipe(
        tap(
          (response) =>
          (this.maxPage = response.data?.total
            ? Math.ceil(response.data?.total / 6)
            : 1)
        ),
        map((heroes) =>
          heroes?.data?.results
            ? this.favoritesService.compareFavorites(heroes?.data?.results)
            : []
        ),
        tap(() => {
          this.loading = false;
        })
      );
  }
}