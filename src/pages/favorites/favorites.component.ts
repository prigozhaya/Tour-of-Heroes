import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../../entities/hero/services/favorites-service/favorites.service';
import { Hero } from '../../shared/model/hero';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
})
export class FavoritesComponent implements OnInit {

  public favorites: Hero[] = [];
  public loading = false;

  constructor(
    private favoritesService: FavoritesService,
  ) { }

  ngOnInit(): void {
    this.favorites = this.favoritesService.getFavorites();
  }

  public removeFavorite(id: number): void {
    this.favorites = this.favoritesService.removeFavorite(id);
  }
}
