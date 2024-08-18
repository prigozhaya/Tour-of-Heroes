import { HeroService } from './../hero.service';
import { ApplicationRef, Component, OnInit } from '@angular/core';
import { Hero } from '../heroes/hero';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit{
  heroes: Hero[] = [];
  loading = false;

  constructor(private heroService: HeroService) {}
  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.loading = true;
      this.heroService.getHeroes().subscribe((heroes) => {
        this.heroes = heroes?.data?.results || [];
        this.loading = false;
      });
  }
}


