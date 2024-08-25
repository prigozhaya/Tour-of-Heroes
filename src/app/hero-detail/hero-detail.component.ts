import { HeroService } from './../hero.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hero } from '../favorites/hero';
import { Location } from '@angular/common';
import { LocalStorageService } from '../local-storage.service';
import { MessageService } from '../message.service';

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
    private location: Location
  ) {}

  hero: Hero = {};
  favorites: Hero[] = [];
  loading = false;

  ngOnInit(): void {
    this.getHero();
    this.favorites = this.localStorageService.get('favorites') || [];
    this.compareFavorites();
  }

  getHero(): void {
    this.loading = true;
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id).subscribe((hero) => {
      this.hero =
        Array.isArray(hero?.data?.results) && hero?.data?.results.length > 0
          ? hero?.data?.results[0]
          : {};
      this.loading = false;
    });
  }
  goBack(): void {
    this.location.back();
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

  compareFavorites(): void {
    if (this.favorites.find((favorit) => favorit.id === this.hero?.id)) {
      this.hero.favorite = true;
    } else {
      this.hero.favorite = false;
    }
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
