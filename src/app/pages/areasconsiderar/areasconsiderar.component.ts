import { Component } from '@angular/core';

@Component({
  selector: 'app-areasconsiderar',
  templateUrl: './areasconsiderar.component.html',
  styleUrls: ['./areasconsiderar.component.scss']
})
export class AreasconsiderarComponent {
  areas: string = '<p>Areas</p>';

  save(event:any){
    console.log(event);
  }
}
