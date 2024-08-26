import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hero } from '../../entities/hero/model/hero';
import { FavoritesService } from '../../entities/hero/services/favorites-service/favorites.service';
import { HeroService } from '../../entities/hero/services/hero-service/hero.service';
import { LocalStorageService } from '../../shared/services/local-storage/local-storage.service';
import { MessageService } from '../../shared/services/messages/message.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.scss',
})
export class HeroDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private localStorageService: LocalStorageService,
    private messageService: MessageService,
    private favoritesService: FavoritesService,
    private location: Location
  ) { }

  hero: Hero = {};
  loading = false;

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    this.loading = true;
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id).subscribe((hero) => {
      this.hero =
        Array.isArray(hero?.data?.results) && hero?.data?.results.length > 0
          ? this.favoritesService.compareFavorites(hero?.data?.results)[0]
          : {};
      this.loading = false;
    });
  }
  goBack(): void {
    this.location.back();
  }

  setFavorite(hero: Hero): void {
    this.favoritesService.setFavorite(hero);
  }

  removeFavorite(id: number): void {
    this.favoritesService.removeFavorite(id);
  }

  toggleFavorite(): void {
    if (this.hero?.favorite) {
      this.hero.favorite = false;
      this.removeFavorite(this.hero?.id!);
    } else {
      this.hero.favorite = true;
      this.setFavorite(this.hero);
    }
  }
}
