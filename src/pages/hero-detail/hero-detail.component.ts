import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hero } from '@shared/model/hero';
import { map, Observable, tap } from 'rxjs';
import { FavoritesService } from '../../entities/hero/services/favorites-service/favorites.service';
import { HeroService } from '../../entities/hero/services/hero-service/hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.scss',
})

export class HeroDetailComponent implements OnInit {
  public hero$!: Observable<Hero>;
  public loading = false;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private favoritesService: FavoritesService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getHero();
  }

  public getHero(): void {
    this.loading = true;
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.hero$ = this.heroService.getHero(id).pipe(
      map((hero) =>
        Array.isArray(hero?.data?.results) && hero?.data?.results.length > 0
          ? this.favoritesService.compareFavorites(hero?.data?.results)[0]
          : {}
      ),
      tap((_) => {
        this.loading = false;
      }));
  }

  public goBack(): void {
    this.location.back();
  }

  public setFavorite(hero: Hero): void {
    this.favoritesService.setFavorite(hero);
  }

  removeFavorite(id: number): void {
    this.favoritesService.removeFavorite(id);
  }

}
