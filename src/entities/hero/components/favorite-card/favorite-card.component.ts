import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Hero } from '../../../../shared/model/hero';

@Component({
  selector: 'app-favorite-card',
  templateUrl: './favorite-card.component.html',
  styleUrl: './favorite-card.component.scss',
})
export class FavoriteCardComponent {
  @Input() favoriteHero: Hero = {};
  @Output() removeFavorite = new EventEmitter<number>();

  public removeFavoriteHero() {
    this.removeFavorite.emit(this.favoriteHero.id);
  }
}
