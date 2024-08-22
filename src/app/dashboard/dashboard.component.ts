import { HeroService } from './../hero.service';
import { Component, OnInit } from '@angular/core';
import { Hero } from '../heroes/hero';
import { map, Observable, of, tap } from 'rxjs';

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

  constructor(private heroService: HeroService) {}
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
        map((heroes) => heroes?.data?.results || [])
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
        map((heroes) => heroes?.data?.results || [])
      )
      .subscribe((heroes) => {
        this.heroes = heroes;
        this.loading = false;
      });
  }
}
