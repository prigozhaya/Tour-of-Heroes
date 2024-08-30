import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeroSearchComponent } from './hero-search.component';

@NgModule({
  imports: [
    CommonModule, FormsModule
  ],
  declarations: [HeroSearchComponent],
  exports: [HeroSearchComponent],
})
export class HeroSearchModule { }