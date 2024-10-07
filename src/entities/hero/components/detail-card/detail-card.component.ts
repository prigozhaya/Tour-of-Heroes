import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Hero } from '@shared/model';

@Component({
  selector: 'app-detail-card',
  templateUrl: './detail-card.component.html',
  styleUrl: './detail-card.component.scss'
})
export class DetailCardComponent {
  @Input() hero: Hero = {};
  @Output() setFavorite = new EventEmitter<Hero>();
  @Output() removeFavorite = new EventEmitter<number>();

  public toggleFavorite(): void {
    if (this.hero?.favorite) {
      this.hero.favorite = false;
      this.removeFavorite.emit(this.hero.id);
    } else {
      this.hero.favorite = true;
      this.setFavorite.emit(this.hero);
    }
  }

}