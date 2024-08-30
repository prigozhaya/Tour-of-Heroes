import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeroModule } from "../../entities/hero/hero.module";
import { SharedModule } from "../../shared/shared.module";
import { FavoritesRoutingModule } from './favorites-routing.module';
import { FavoritesComponent } from './favorites.component';
@NgModule({
  imports: [
    CommonModule,
    FavoritesRoutingModule,
    HeroModule,
    SharedModule
  ],
  declarations: [FavoritesComponent]
})
export class FavoritesModule { }