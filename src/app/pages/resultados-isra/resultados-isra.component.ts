import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '@services/app.service';
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
  expediente!: any;
/*   pac: Pacientes = new Pacientes(); */
  constructor(private route: ActivatedRoute, private _res: ResultadosService,private appService: AppService,private router: Router) {

  }
  ngOnInit(): void {
 
    this.expediente=localStorage.getItem('Expediente');
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

        var res=  Number(this.resultadosC[i].res_respuesta1)+Number(this.resultadosC[i].res_respuesta2)+Number(this.resultadosC[i].res_respuesta3)+Number(this.resultadosC[i].res_respuesta4)+Number(this.resultadosC[i].res_respuesta5)+Number(this.resultadosC[i].res_respuesta6)+Number(this.resultadosC[i].res_respuesta7);
        console.log(res);
         /*  console.log(this.resultadosC[i].res_sum); */
      /*     this.numeros.push(this.resultadosC[i].res_sum); */
          /* this.doubles.push(this.resultadosC[i].res_sum); */
          this.doubles.push(res);
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
          var res=  Number(this.resultadosF[i].res_respuesta1)+Number(this.resultadosF[i].res_respuesta2)+Number(this.resultadosF[i].res_respuesta3)+Number(this.resultadosF[i].res_respuesta4)+Number(this.resultadosF[i].res_respuesta5)+Number(this.resultadosF[i].res_respuesta6)+Number(this.resultadosF[i].res_respuesta7)+Number(this.resultadosF[i].res_respuesta8)+Number(this.resultadosF[i].res_respuesta9)+Number(this.resultadosF[i].res_respuesta10);
          console.log(res);
        /*   console.log(this.resultadosF[i].res_sum); */
      /*     this.numeros.push(this.resultadosC[i].res_sum); */
         /*  this.doubles2.push(this.resultadosF[i].res_sum); */
         this.doubles2.push(res);
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
          var res=  Number(this.resultadosM[i].res_respuesta1)+Number(this.resultadosM[i].res_respuesta2)+Number(this.resultadosM[i].res_respuesta3)+Number(this.resultadosM[i].res_respuesta4)+Number(this.resultadosM[i].res_respuesta5)+Number(this.resultadosM[i].res_respuesta6)+Number(this.resultadosM[i].res_respuesta7);
          console.log(res);
         /*  console.log(this.resultadosM[i].res_sum); */
      /*     this.numeros.push(this.resultadosC[i].res_sum); */
          /* this.doubles3.push(this.resultadosM[i].res_sum); */
          this.doubles3.push(res);
        }
        console.log(this.doubles3);
        this.totalM= this.doubles3.reduce((a, b) => a + b, 0);
      }, error => {
        console.log(error);
        //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }
}
