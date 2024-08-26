import { Component, OnInit } from '@angular/core';
import { map, tap } from 'rxjs';
import { Hero } from '../../entities/hero/model/hero';
import { FavoritesService } from '../../entities/hero/services/favorites-service/favorites.service';
import { HeroService } from '../../entities/hero/services/hero-service/hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
  loading = false;
  page = 1;
  maxPage = 1;
  searchValue = '';

  constructor(
    private heroService: HeroService,
    private favoritesService: FavoritesService,
  ) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  setPage(step: number): void {
    this.page += step;
    if (!this.searchValue) {
      this.getHeroes();
    } else {
      this.searchHeroes();
    }
  }

  setFavorite(hero: Hero): void {
    this.favoritesService.setFavorite(hero);
  }

  removeFavorite(id: number): void {
    this.favoritesService.removeFavorite(id);
  }

  setSearchValue(searchValue: string): void {
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
    this.heroService
      .getHeroes((this.page - 1) * 6)
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
        )
      )
      .subscribe((heroes) => {
        this.heroes = heroes;
        this.loading = false;
      });
  }

  searchHeroes(): void {
    this.loading = true;
    this.heroService
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
        )
      )
      .subscribe((heroes) => {
        this.heroes = heroes;
        this.loading = false;
      });
  }
}
