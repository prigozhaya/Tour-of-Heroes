import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'dashboard', loadChildren: () => import('../pages/dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'favorites', loadChildren: () => import('../pages/favorites/favorites.module').then(m => m.FavoritesModule) },
  { path: 'detail/:id', loadChildren: () => import('../pages/hero-detail/hero-detail.module').then(m => m.HeroDetailModule) },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', loadChildren: () => import('../pages/not-found/not-found.module').then(m => m.NotFoundModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
