import { Injectable } from '@angular/core';
import { LocalStorageService } from '../../../../shared/services/local-storage/local-storage.service';
import { MessageService } from '../../../../shared/services/messages/message.service';
import { Hero } from '../../model/hero';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  constructor(
    private messageService: MessageService,
    private localStorageService: LocalStorageService,
  ) { }

  favorites: Hero[] = [];

  getFavorites(): Hero[] {
    this.favorites = this.localStorageService.get('favorites') || [];
    this.messageService.add({ text: `fetched favorites heroes` });
    return this.favorites
  }

  setFavorite(hero: Hero): void {
    this.favorites.unshift(hero);
    this.localStorageService.set('favorites', this.favorites);
    this.messageService.add({ text: `add favorite hero: ${hero.id}` });
  }

  removeFavorite(id: number): Hero[] {
    this.favorites = this.favorites.filter((el) => el.id !== id);
    this.localStorageService.set('favorites', this.favorites);
    this.messageService.add({ text: `remove favorite hero: ${id}` });
    return this.favorites;
  }

  compareFavorites(receivedHeroes: Hero[]): Hero[] {
    this.favorites = this.localStorageService.get('favorites') || [];
    return receivedHeroes.map((el) => {
      if (this.favorites.find((favorite) => favorite.id === el.id)) {
        el.favorite = true;
      } else {
        el.favorite = false;
      }
      return el;
    });
  }
}
