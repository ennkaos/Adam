import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RezervariComponent } from './rezervari.component';
import { RezervariDetailsComponent } from './rezervari-details/rezervari-details.component';

const routes: Routes = [
  { path: '', component: RezervariComponent },
  { path: 'details/:id', component: RezervariDetailsComponent },
  { path: 'update/:id', component: RezervariDetailsComponent },

  { path: 'create', component: RezervariDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RezervariRoutingModule {}
