import { Component } from '@angular/core';

@Component({
  selector: 'app-analisisfunc',
  templateUrl: './analisisfunc.component.html',
  styleUrls: ['./analisisfunc.component.scss']
})
export class AnalisisfuncComponent {
  antecedentes: string = '<p>Antecedentes</p>';
  conducta: string = '<p>Conducta</p>';
  consecuentes: string = '<p>Consecuentes</p>';
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
