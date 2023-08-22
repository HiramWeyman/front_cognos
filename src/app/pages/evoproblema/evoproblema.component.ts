import { Component } from '@angular/core';

@Component({
  selector: 'app-evoproblema',
  templateUrl: './evoproblema.component.html',
  styleUrls: ['./evoproblema.component.scss']
})
export class EvoproblemaComponent {
  evoproblema: string = '<p>Evoloción de problema</p>';

  save(event:any){
    console.log(event);
  }
}
