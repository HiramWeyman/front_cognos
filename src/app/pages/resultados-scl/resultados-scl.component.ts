import { ResultadosSCL } from '@/models/ResultadosSCL';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResultadosService } from '@services/resultados.service';

@Component({
  selector: 'app-resultados-scl',
  templateUrl: './resultados-scl.component.html',
  styleUrls: ['./resultados-scl.component.scss']
})
export class ResultadosSCLComponent {
  id!: any;
  resultados: ResultadosSCL[];
  total!:any;
  expediente!: any;
/*   pac: Pacientes = new Pacientes(); */
  constructor(private route: ActivatedRoute, private _res: ResultadosService,) {

  }
  ngOnInit(): void {
    this.expediente=sessionStorage.getItem('Expediente');
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    this.cargarResSCL();
    this.cargarTotalSCL();
  }

  cargarResSCL() {
    this._res.GetResultadosSCLList(this.id).subscribe(
      fu => {
        this.resultados = fu;
        console.log(this.resultados);
      }, error => {
        console.log(error);
        //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }

  cargarTotalSCL() {
    this._res.GetTotalSCL(this.id).subscribe(
      fu => {
        this.total = fu;
        console.log(this.total);
      }, error => {
        console.log(error);
        //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }
}
