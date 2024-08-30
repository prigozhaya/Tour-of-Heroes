import { NgFor, NgIf } from '@angular/common';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { DashboardModule } from '../pages/dashboard/dashboard.module';
import { FavoritesModule } from '../pages/favorites/favorites.module';
import { NotFoundModule } from '../pages/not-found/not-found.module';
import { FooterModule } from "../widgets/footer/footer.module";
import { HeaderModule } from "../widgets/header/header.module";
import { MessagesModule } from "../widgets/messages/messages.module";
import { HeroDetailModule } from './../pages/hero-detail/hero-detail.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgFor,
    NgIf,
    DashboardModule,
    HeroDetailModule,
    FavoritesModule,
    NotFoundModule,
    HeaderModule,
    MessagesModule,
    FooterModule,
  ],
  providers: [provideClientHydration(), provideHttpClient(withFetch())],
  bootstrap: [AppComponent],
})
export class AppModule { }
