import { Component, Input } from '@angular/core';
import { Hero } from '../heroes/hero';

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrl: './hero-card.component.scss'
})
export class HeroCardComponent {
  @Input() hero: Hero | undefined;
}
