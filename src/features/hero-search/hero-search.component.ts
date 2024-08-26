import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrl: './hero-search.component.scss',
})
export class HeroSearchComponent {
  searchValue = '';

  @Output() onEnter = new EventEmitter<string>();
  setSearchValue() {
    this.onEnter.emit(this.searchValue.trim());
  }
}
