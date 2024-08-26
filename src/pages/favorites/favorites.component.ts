import { Component, OnInit } from '@angular/core';
import { Hero } from '../../entities/hero/model/hero';
import { FavoritesService } from '../../entities/hero/services/favorites-service/favorites.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
})
export class FavoritesComponent implements OnInit {
  constructor(
    private favoritesService: FavoritesService,
  ) { }
  favorites: Hero[] = [];
  loading = false;

  ngOnInit(): void {
    this.favorites = this.favoritesService.getFavorites();
  }

  removeFavorite(id: number): void {
    this.favorites = this.favoritesService.removeFavorite(id);
  }
}
