import { LocalStorageService } from './../local-storage.service';
import { HeroService } from './../hero.service';
import { Component, OnInit } from '@angular/core';
import { Hero } from '../favorites/hero';
import { map, Observable, of, tap } from 'rxjs';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
  favorites: Hero[] = [];
  loading = false;
  page = 1;
  maxPage = 1;
  searchValue = '';

  constructor(
    private heroService: HeroService,
    private localStorageService: LocalStorageService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getHeroes();
    this.favorites = this.localStorageService.get('favorites') || [];
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
    this.favorites.unshift(hero);
    this.localStorageService.set('favorites', this.favorites);
    this.messageService.add({ text: `add favorite hero: ${hero.id}` });
  }

  removeFavorite(id: number): void {
    this.favorites = this.favorites.filter((el) => el.id !== id);
    this.localStorageService.set('favorites', this.favorites);
    this.messageService.add({ text: `remove favorite hero: ${id}` });
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
            ? this.compareFavorites(heroes?.data?.results)
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
            ? this.compareFavorites(heroes?.data?.results)
            : []
        )
      )
      .subscribe((heroes) => {
        this.heroes = heroes;
        this.loading = false;
      });
  }

  compareFavorites(receivedHeroes: Hero[]): Hero[] {
    return receivedHeroes.map((el) => {
      if (this.favorites.find((favorit) => favorit.id === el.id)) {
        el.favorite = true;
      } else {
        el.favorite = false;
      }
      return el;
    });
  }
}
