import { HeroService } from './../hero.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hero} from '../heroes/hero';
import { MessageService } from '../message.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.scss',
})
export class HeroDetailComponent {
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    private messageService: MessageService
  ) {}

  hero?: Hero;
  loading = false;

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    this.loading = true;
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.messageService.add({ text: `HeroService: fetched hero id=${id}` });
    this.heroService.getHero(id).subscribe((hero) => {
      console.log(hero);
      this.hero =
        Array.isArray(hero?.data?.results) && hero?.data?.results.length > 0
          ? hero?.data?.results[0]
          : {};
    });
    this.loading = false;
    console.log(this.hero);
  }
  goBack(): void {
    this.location.back();
  }
}
