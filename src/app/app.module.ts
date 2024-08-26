import { NgFor, NgIf } from '@angular/common';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { FavoriteCardComponent } from '../entities/hero/components/favorite-card/favorite-card.component';
import { HeroCardComponent } from '../entities/hero/components/hero-card/hero-card.component';
import { HeroSearchComponent } from '../features/hero-search/hero-search.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { FavoritesComponent } from '../pages/favorites/favorites.component';
import { HeroDetailComponent } from '../pages/hero-detail/hero-detail.component';
import { NotFoundComponent } from '../pages/not-found/not-found.component';
import { PaginationComponent } from '../shared/components/pagination/pagination.component';
import { SpinnerComponent } from '../shared/components/spinner/spinner.component';
import { FooterComponent } from '../widgets/footer/footer.component';
import { HeaderComponent } from '../widgets/header/header.component';
import { MessagesComponent } from '../widgets/messages/messages.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    FavoritesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent,
    HeroSearchComponent,
    HeaderComponent,
    HeroCardComponent,
    FooterComponent,
    NotFoundComponent,
    PaginationComponent,
    SpinnerComponent,
    FavoriteCardComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, NgFor, NgIf],
  providers: [provideClientHydration(), provideHttpClient(withFetch())],
  bootstrap: [AppComponent],
})
export class AppModule { }
