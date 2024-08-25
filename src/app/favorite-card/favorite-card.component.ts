import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Hero } from '../favorites/hero';

@Component({
  selector: 'app-favorite-card',
  templateUrl: './favorite-card.component.html',
  styleUrl: './favorite-card.component.scss',
})
export class FavoriteCardComponent {
  @Input() favoriteHero: Hero = {};
  @Output() removeFavorite = new EventEmitter<number>();

  removeFavoriteHero() {
    this.removeFavorite.emit(this.favoriteHero.id);
  }
}
