import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './login.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
    canActivate: [LoginGuard],
    data: {
      expectedRole: [0, 1, 2],
    },
  },
  {
    path: 'materii',
    loadChildren: () =>
      import('./materii/materii.module').then((m) => m.MateriiModule),
    canActivate: [LoginGuard],
    data: {
      expectedRole: [0],
    },
  },
  {
    path: 'serii',
    loadChildren: () =>
      import('./serii/serii.module').then((m) => m.SeriiModule),
    canActivate: [LoginGuard],
    data: {
      expectedRole: [0],
    },
  },
  {
    path: 'rezervari',
    loadChildren: () =>
      import('./rezervari/rezervari.module').then((m) => m.RezervariModule),
    canActivate: [LoginGuard],
    data: {
      expectedRole: [0, 1],
    },
  },
  {
    path: 'orar',
    loadChildren: () => import('./orar/orar.module').then((m) => m.OrarModule),
    canActivate: [LoginGuard],
    data: {
      expectedRole: [2],
    },
  },
  {
    path: 'roluri',
    loadChildren: () =>
      import('./roluri/roluri.module').then((m) => m.RoluriModule),
    canActivate: [LoginGuard],
    data: {
      expectedRole: [0, 1, 2],
    },
  },
  {
    path: 'add-room',
    loadChildren: () =>
      import('./add-room/add-room.module').then((m) => m.AddRoomModule),
    canActivate: [LoginGuard],
    data: {
      expectedRole: [0],
    },
  },
  {
    path: 'requests',
    loadChildren: () =>
      import('./requests/requests.module').then((m) => m.RequestsModule),
    canActivate: [LoginGuard],
    data: {
      expectedRole: [0, 1],
    },
  },

  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
