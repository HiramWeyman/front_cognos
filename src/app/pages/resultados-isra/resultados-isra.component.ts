import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResultadosService } from '@services/resultados.service';

@Component({
  selector: 'app-resultados-isra',
  templateUrl: './resultados-isra.component.html',
  styleUrls: ['./resultados-isra.component.scss']
})
export class ResultadosIsraComponent {

  id!: any;
  resultadosC: any[];
  resultadosF: any[];
  resultadosM: any[];
  numeros :number[];
  doubles = [];
  doubles2 = [];
  doubles3 = [];
  totalC:number;
  totalF:number;
  totalM:number;
  total!:any;
/*   pac: Pacientes = new Pacientes(); */
  constructor(private route: ActivatedRoute, private _res: ResultadosService,) {

  }
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.cargarResC();
    this.cargarResF();
    this.cargarResM();
 
  }

  cargarResC() {
    this._res.GetResultadosIsraCList(this.id).subscribe(
      fu => {
        this.resultadosC = fu;
        console.log(this.resultadosC);
      
        for(var i=0; i<this.resultadosC.length; i++){
          console.log(this.resultadosC[i].res_sum);
      /*     this.numeros.push(this.resultadosC[i].res_sum); */
          this.doubles.push(this.resultadosC[i].res_sum);
        }
        console.log(this.doubles);
        this.totalC= this.doubles.reduce((a, b) => a + b, 0);
      }, error => {
        console.log(error);
        //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }

  cargarResF() {
    this._res.GetResultadosIsraFList(this.id).subscribe(
      fu => {
        this.resultadosF = fu;
        console.log(this.resultadosF);
        for(var i=0; i<this.resultadosF.length; i++){
          console.log(this.resultadosF[i].res_sum);
      /*     this.numeros.push(this.resultadosC[i].res_sum); */
          this.doubles2.push(this.resultadosF[i].res_sum);
        }
        console.log(this.doubles2);
        this.totalF= this.doubles2.reduce((a, b) => a + b, 0);
      }, error => {
        console.log(error);
        //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }

  cargarResM() {
    this._res.GetResultadosIsraMList(this.id).subscribe(
      fu => {
        this.resultadosM = fu;
        console.log(this.resultadosM);
        for(var i=0; i<this.resultadosM.length; i++){
          console.log(this.resultadosM[i].res_sum);
      /*     this.numeros.push(this.resultadosC[i].res_sum); */
          this.doubles3.push(this.resultadosM[i].res_sum);
        }
        console.log(this.doubles3);
        this.totalM= this.doubles3.reduce((a, b) => a + b, 0);
      }, error => {
        console.log(error);
        //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }
}