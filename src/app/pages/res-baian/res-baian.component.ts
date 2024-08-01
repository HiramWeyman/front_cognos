import { Maestro } from '@/models/Maestro';
import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '@services/app.service';
import { ResultadosService } from '@services/resultados.service';

@Component({
  selector: 'app-res-baian',
  templateUrl: './res-baian.component.html',
  styleUrls: ['./res-baian.component.scss']
})
export class ResBaianComponent {
  id!: any;
  //resultados: Maestro[];
  resultados: Maestro[] = [];
  total!:any;
  fecMaestro:any;
  expediente!: any;
  interpreta:string;

  constructor(private route: ActivatedRoute, private _res: ResultadosService,private datePipe: DatePipe,private appService: AppService,private router: Router) {

  }
  ngOnInit(): void {

    this.expediente=localStorage.getItem('Expediente');
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    this.cargarMaestroResBAIAN();
    
  }

  cargarMaestroResBAIAN() {
    this._res.getResBAIANMaestro(this.id).subscribe(
      fu => {
        this.resultados = fu;
        for(let i=0;i<this.resultados.length;i++){
          this.fecMaestro =this.datePipe.transform(this.resultados[i].maestro_fecha,"dd/MM/yyyy");
          this.resultados[i].maestro_fecha= this.fecMaestro;
          
          this._res.GetTotalBAIAN(this.resultados[i].maestro_id).subscribe(
            fu => {
              this.total = fu;
              console.log(this.total);
              this.resultados[i].maestro_interpretacion = this.getEstatus(this.total);
            }, error => {
              console.log(error);
              //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
            });
        }
        console.log(this.resultados);
       
      }, error => {
        console.log(error);
        //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }

  cargarTotalBAIAN(id_maestro:number)  {
    this._res.GetTotalBAIAN(id_maestro).subscribe(
      fu => {
        this.total = fu;
        console.log(this.total);
        
      }, error => {
        console.log(error);
        //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }

  getEstatus(total: number): string {
    if(total>1 && total<=10){
      return'Altibajos Normales';
    }
    else if(total>=11 && total<=16){
      return 'Leve perturbación del estado de ánimo';
    }
    else if(total>=17 && total<=20){
      return 'Estado de Depresión Intermitente';
    }
    else if(total>=21 && total<=30){
      return 'Depresión Moderada';
    }
    else if(total>=31 && total<=40){
      return 'Depresión Grave';
    }
    else if(total>40){
      return 'Depresión Extrema';
    }
   
  }


}
