import { HeroService } from './../hero.service';
import { Component } from '@angular/core';
import { Hero } from '../heroes/hero';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
heroes: Hero[] = [];

constructor(private heroService:HeroService){}
ngOnInit():void{
  this.getHeroes();
}

getHeroes():void {
  this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes.slice(1,5))
}
}
