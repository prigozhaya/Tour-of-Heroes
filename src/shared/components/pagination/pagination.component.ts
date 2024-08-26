import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent {
  @Input() maxPage: number = 1;
  @Input() page: number = 1;

  @Output() onClick = new EventEmitter<number>();
  setNextPage() {
    if (this.maxPage === this.page) {
      return;
    }
    this.onClick.emit(1);
  }
  setPrevPage() {
    if (this.page === 1) {
      return;
    }
    this.onClick.emit(-1);
  }
}
