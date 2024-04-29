import { ResultadosBAIAN } from '@/models/ResultadosBAIAN';
import { ResultadosSCL } from '@/models/ResultadosSCL';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '@services/app.service';
import { ResultadosService } from '@services/resultados.service';

@Component({
  selector: 'app-resultados-baian',
  templateUrl: './resultados-baian.component.html',
  styleUrls: ['./resultados-baian.component.scss']
})
export class ResultadosBaianComponent {
  id!: any;
  resultados: ResultadosBAIAN[];
  total!:any;
  expediente!: any;
/*   pac: Pacientes = new Pacientes(); */
  constructor(private route: ActivatedRoute, private _res: ResultadosService,private appService: AppService,private router: Router) {

  }
  ngOnInit(): void {
  
    this.expediente=localStorage.getItem('Expediente');
    this.id = this.route.snapshot.paramMap.get('id');
    this.cargarResBAIAN();
    this.cargarTotalBAIAN();
  }

  cargarResBAIAN() {
    this._res.GetResultadosBAIANList(this.id).subscribe(
      fu => {
        this.resultados = fu;
        console.log(this.resultados);
      }, error => {
        console.log(error);
        //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }

  cargarTotalBAIAN() {
    this._res.GetTotalBAIAN(this.id).subscribe(
      fu => {
        this.total = fu;
        console.log(this.total);
      }, error => {
        console.log(error);
        //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }
}
