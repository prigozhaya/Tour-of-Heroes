import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { DetailCardComponent } from './components/detail-card/detail-card.component';
import { FavoriteCardComponent } from './components/favorite-card/favorite-card.component';
import { HeroCardComponent } from './components/hero-card/hero-card.component';
@NgModule({
  imports: [
    CommonModule, RouterModule,
    SharedModule
  ],
  declarations: [FavoriteCardComponent, HeroCardComponent, DetailCardComponent],
  exports: [FavoriteCardComponent, HeroCardComponent, DetailCardComponent],
  providers: [],
})
export class HeroModule { }