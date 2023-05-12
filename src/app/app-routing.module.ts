import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './login.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
  },

  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
    canActivate: [LoginGuard],
  },
  {
    path: 'materii',
    loadChildren: () =>
      import('./materii/materii.module').then((m) => m.MateriiModule),
  },
  {
    path: 'rezervari',
    loadChildren: () =>
      import('./rezervari/rezervari.module').then((m) => m.RezervariModule),
    canActivate: [LoginGuard],
  },
  {
    path: 'accounts',
    loadChildren: () =>
      import('./accounts/accounts.module').then((m) => m.AccountsModule),
    canActivate: [LoginGuard],
  },
  {
    path: 'roluri',
    loadChildren: () =>
      import('./roluri/roluri.module').then((m) => m.RoluriModule),
    canActivate: [LoginGuard],
  },
  {
    path: 'add-room',
    loadChildren: () =>
      import('./add-room/add-room.module').then((m) => m.AddRoomModule),
    canActivate: [LoginGuard],
  },

  {
    path: 'register',
    loadChildren: () =>
      import('./register/register.module').then((m) => m.RegisterModule),
  },
  { path: ' ', redirectTo: '/home', pathMatch: 'full' },

  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
