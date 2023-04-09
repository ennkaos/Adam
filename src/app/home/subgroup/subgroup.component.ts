import { Component, Input } from '@angular/core';
import { SubGrupsModel } from 'src/app/models/SubGrupsModel';

@Component({
  selector: 'app-subgroup',
  templateUrl: './subgroup.component.html',
  styleUrls: ['./subgroup.component.css'],
})
export class SubgroupComponent {
  @Input('subgroup')
  subgroup!: SubGrupsModel;
  arrayListHours: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  arrayListDays: number[] = [0, 1, 2, 3, 4];
  arrayResult!: any[]

  ngOnInit():void{
  
  }
}
