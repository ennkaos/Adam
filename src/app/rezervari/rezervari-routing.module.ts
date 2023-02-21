import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RezervariComponent } from './rezervari.component';

const routes: Routes = [{ path: '', component: RezervariComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RezervariRoutingModule {}
