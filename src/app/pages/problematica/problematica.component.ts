import { Component } from '@angular/core';

@Component({
  selector: 'app-problematica',
  templateUrl: './problematica.component.html',
  styleUrls: ['./problematica.component.scss']
})
export class ProblematicaComponent {
  consulta: string = '<p>Consulta</p>';

  save(event:any){
    console.log(event);
  }
}
