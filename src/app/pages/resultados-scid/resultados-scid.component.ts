import { ResultadosSCID } from '@/models/RessultadosSCID';
import { Component } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
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
/*   pac: Pacientes = new Pacientes(); */
  constructor(private route: ActivatedRoute, private _res: ResultadosService,) {

  }
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.cargarResSCID();
 
  }

  cargarResSCID() {
    this._res.GetResultadosSCIDList(this.id).subscribe(
      fu => {
        this.resultados = fu;
        console.log(this.resultados);
      }, error => {
        console.log(error);
        //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }
}
