import { Component } from '@angular/core';

@Component({
  selector: 'app-diagnostico',
  templateUrl: './diagnostico.component.html',
  styleUrls: ['./diagnostico.component.scss']
})
export class DiagnosticoComponent {
  diagnostico: string = '<p>Diagnostico</p>';

  save(event:any){
    console.log(event);
  }
}
