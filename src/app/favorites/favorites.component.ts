import { MessageService } from '../message.service';
import { HeroService } from '../hero.service';
import { Component, OnInit } from '@angular/core';
import { Hero } from './hero';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
})
export class FavoritesComponent implements OnInit {
  constructor(
    private messageService: MessageService,
    private localStorageService: LocalStorageService
  ) {}
  favorites: Hero[] = [];
  loading = false;

  ngOnInit(): void {
    this.favorites = this.localStorageService.get('favorites') || [];
    this.messageService.add({ text: `fetched favorites heroes` });
  }

  removeFavorite(id: number): void {
    this.favorites = this.favorites.filter((el) => el.id !== id);
    this.localStorageService.set('favorites', this.favorites);
    this.messageService.add({ text: `remove favorite hero: ${id}` });
  }
}
