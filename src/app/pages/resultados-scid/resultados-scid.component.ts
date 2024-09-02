import { ResultadosSCID } from '@/models/RessultadosSCID';
import { Component } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '@services/app.service';
import { ResultadosService } from '@services/resultados.service';

@Component({
  selector: 'app-resultados-scid',
  templateUrl: './resultados-scid.component.html',
  styleUrls: ['./resultados-scid.component.scss']
})
export class ResultadosScidComponent {
  id!: any;
  resultados: ResultadosSCID[];
  total!:any;
  expediente!: any;
/*   pac: Pacientes = new Pacientes(); */
  constructor(private route: ActivatedRoute, private _res: ResultadosService,private appService: AppService,private router: Router) {

  }
  ngOnInit(): void {
 
    this.expediente=localStorage.getItem('Expediente');
    this.id = this.route.snapshot.paramMap.get('id');
    this.cargarResSCID();
 
  }

  cargarResSCID() {
    this._res.GetResultadosSCIDList(this.id).subscribe(
      fu => {
        this.resultados = fu;
        for(let i=0;i<this.resultados.length;i++){
          if(this.resultados[i].res_respuesta==0){
            this.resultados[i].desc_resp='No'
          }
          else{
            this.resultados[i].desc_resp='Si'
          }
         
        }
        console.log(this.resultados);
      }, error => {
        console.log(error);
        //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }
}
