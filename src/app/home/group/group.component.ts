import { Component, Input } from '@angular/core';
import { GroupModel } from 'src/app/models/GroupModel';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css'],
})
export class GroupComponent {
  @Input('groups')
  groups!: GroupModel;
}
