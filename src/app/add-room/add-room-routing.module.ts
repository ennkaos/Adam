import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddRoomComponent } from './add-room.component';
import { RoomsDetailsComponent } from './rooms-details/rooms-details.component';

export const routes: Routes = [
  { path: '', component: AddRoomComponent },
  {
    path: 'details/:id',
    component: RoomsDetailsComponent,
  },
  {
    path: 'update/:id',
    component: RoomsDetailsComponent,
  },
  {
    path: 'create',
    component: RoomsDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddRoomRoutingModule {}
