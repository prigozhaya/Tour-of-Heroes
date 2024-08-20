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

  constructor(private heroService: HeroService) {}
  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.loading = true;
    this.heroService
      .getHeroes()
      .pipe(
        map((heroes) => heroes?.data?.results || [])
      )
      .subscribe((heroes) => {
        this.heroes = heroes;
        this.loading = false;
      });
  }

  searchHeroes(searchValue: string): void {
    this.loading = true;
    this.heroService
      .searchHeroes(searchValue)
      .pipe(
        map((heroes) => heroes?.data?.results || []),
        tap((_) => (this.loading = false))
      )
      .subscribe((heroes) => {
        this.heroes = heroes;
        this.loading = false;
      });
  }
}
