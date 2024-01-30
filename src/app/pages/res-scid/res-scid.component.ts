import { Maestro } from '@/models/Maestro';
import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResultadosService } from '@services/resultados.service';

@Component({
  selector: 'app-res-scid',
  templateUrl: './res-scid.component.html',
  styleUrls: ['./res-scid.component.scss']
})
export class ResScidComponent {
  id!: any;
  resultados: Maestro[];
  total!:any;
  fecMaestro:any;
  expediente!: any;

  constructor(private route: ActivatedRoute, private _res: ResultadosService,private datePipe: DatePipe) {

  }
  ngOnInit(): void {
    this.expediente=sessionStorage.getItem('Expediente');
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    this.cargarMaestroResSCID();
  }

  cargarMaestroResSCID() {
    this._res.getResSCIDMaestro(this.id).subscribe(
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
