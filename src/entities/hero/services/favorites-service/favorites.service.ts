import { Injectable } from '@angular/core';
import { Hero } from '@shared/model/hero';
import { LocalStorageService } from '@shared/services/local-storage/local-storage.service';
import { MessageService } from '@shared/services/messages/message.service';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  public favorites: Hero[] = [];

  constructor(
    private messageService: MessageService,
    private localStorageService: LocalStorageService,
  ) { }

  public getFavorites(): Hero[] {
    this.favorites = this.localStorageService.get('favorites') || [];
    this.messageService.add({ text: `fetched favorites heroes` });
    return this.favorites
  }

  public setFavorite(hero: Hero): void {
    this.favorites.unshift(hero);
    this.localStorageService.set('favorites', this.favorites);
    this.messageService.add({ text: `add favorite hero: ${hero.id}` });
  }

  public removeFavorite(id: number): Hero[] {
    this.favorites = this.favorites.filter((el) => el.id !== id);
    this.localStorageService.set('favorites', this.favorites);
    this.messageService.add({ text: `remove favorite hero: ${id}` });
    return this.favorites;
  }

  public compareFavorites(receivedHeroes: Hero[]): Hero[] {
    this.favorites = this.localStorageService.get('favorites') || [];
    return receivedHeroes.map((el) => {
      el.favorite = !!this.favorites.find((favorite) => favorite.id === el.id)
      return el;
    });
  }
}
