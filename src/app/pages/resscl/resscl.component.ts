import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResultadosService } from '@services/resultados.service';
import { DatePipe } from '@angular/common';
import { Maestro } from '@/models/Maestro';
import { AppService } from '@services/app.service';

@Component({
  selector: 'app-resscl',
  templateUrl: './resscl.component.html',
  styleUrls: ['./resscl.component.scss']
})
export class RessclComponent {

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
    this.cargarMaestroResSCL();
  }

  cargarMaestroResSCL() {
    this._res.getResSCLMaestro(this.id).subscribe(
      fu => {
        this.resultados = fu;
        for(let i=0;i<this.resultados.length;i++){
          this.fecMaestro =this.datePipe.transform(this.resultados[i].maestro_fecha,"dd/MM/yyyy");
          this.resultados[i].maestro_fecha= this.fecMaestro;
        }
        console.log(this.resultados);
      }, error => {
        console.log(error);
        //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }

}
