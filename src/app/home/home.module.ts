import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { GroupComponent } from './group/group.component';
import { SubgroupComponent } from './subgroup/subgroup.component';

@NgModule({
  declarations: [HomeComponent, GroupComponent, SubgroupComponent],
  imports: [CommonModule, HomeRoutingModule],
})
export class HomeModule {}
