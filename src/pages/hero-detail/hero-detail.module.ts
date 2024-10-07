import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeroModule } from "../../entities/hero/hero.module";
import { HeroDetailRoutingModule } from './hero-detail-routing.module';
import { HeroDetailComponent } from './hero-detail.component';

@NgModule({
  imports: [
    CommonModule,
    HeroDetailRoutingModule,
    HeroModule
  ],
  declarations: [HeroDetailComponent]
})
export class HeroDetailModule { }