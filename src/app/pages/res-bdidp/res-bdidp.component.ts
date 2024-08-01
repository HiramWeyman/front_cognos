import { Maestro } from '@/models/Maestro';
import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '@services/app.service';
import { ResultadosService } from '@services/resultados.service';

@Component({
  selector: 'app-res-bdidp',
  templateUrl: './res-bdidp.component.html',
  styleUrls: ['./res-bdidp.component.scss']
})
export class ResBdidpComponent {
  id!: any;
  resultados: Maestro[];
  total!:any;
  fecMaestro:any;
  expediente!: any;

  constructor(private route: ActivatedRoute, private _res: ResultadosService,private datePipe: DatePipe,private appService: AppService,private router: Router) {

  }
  ngOnInit(): void {
  
    this.expediente=localStorage.getItem('Expediente');
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    this.cargarMaestroResBDIDP();
  }

  cargarMaestroResBDIDP() {
    this._res.getResBDIDPMaestro(this.id).subscribe(
      fu => {
        this.resultados = fu;
        for(let i=0;i<this.resultados.length;i++){
          this.fecMaestro =this.datePipe.transform(this.resultados[i].maestro_fecha,"dd/MM/yyyy");
          this.resultados[i].maestro_fecha= this.fecMaestro;
          this._res.GetTotalBDIDP(this.resultados[i].maestro_id).subscribe(
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

  getEstatus(total: number): string {
    if(total>=0 && total<=9){
      return'Normal';
    }
    else if(total>=10 && total<=18){
      return 'Leve';
    }
    else if(total>=19 && total<=29){
      return 'Moderada';
    }
    else if(total>=30 && total<=63){
      return 'Severa';
    }
   
  }

}
