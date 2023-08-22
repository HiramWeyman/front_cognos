import { Component } from '@angular/core';

declare var CKEDITOR: any;
@Component({
  selector: 'app-saludfisica',
  templateUrl: './saludfisica.component.html',
  styleUrls: ['./saludfisica.component.scss']
})


export class SaludfisicaComponent {
  Sueno: string = '<p>Sueño</p>';
  Alimentacion: string = '<p>Alimentacion</p>';
  ActFisica: string = '<p>Actividad Fisica</p>';
  save(event:any){
    console.log(event);
  }
  saveAl(event:any){
    console.log(event);
  }
  saveActFisica(event:any){
    console.log(event);
  }
}
