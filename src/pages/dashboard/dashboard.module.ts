import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeroModule } from "../../entities/hero/hero.module";
import { HeroSearchModule } from "../../features/hero-search/hero-search.module";
import { SharedModule } from "../../shared/shared.module";
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    HeroSearchModule,
    HeroModule,
    SharedModule
  ],
  declarations: [DashboardComponent],
  providers: [],
})

export class DashboardModule { }