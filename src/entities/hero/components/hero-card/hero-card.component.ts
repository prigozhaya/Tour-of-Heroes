import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Hero } from '../../model/hero';

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrl: './hero-card.component.scss',
})
export class HeroCardComponent {
  @Input() hero: Hero = {};
  @Output() setFavorite = new EventEmitter<Hero>();
  @Output() removeFavorite = new EventEmitter<number>();

  toggleFavorite(): void {
    if (this.hero?.favorite) {
      this.hero.favorite = false;
      this.removeFavorite.emit(this.hero.id);
    } else {
      this.hero.favorite = true;
      this.setFavorite.emit(this.hero);
    }
  }
}
