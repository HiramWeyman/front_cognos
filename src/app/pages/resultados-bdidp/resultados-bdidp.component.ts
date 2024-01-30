import { ResultadosBDIDP } from '@/models/resultadosBDIDP';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResultadosService } from '@services/resultados.service';

@Component({
  selector: 'app-resultados-bdidp',
  templateUrl: './resultados-bdidp.component.html',
  styleUrls: ['./resultados-bdidp.component.scss']
})
export class ResultadosBdidpComponent {
  id!: any;
  resultados: ResultadosBDIDP[];
  total!:any;
  expediente!: any;
  constructor(private route: ActivatedRoute, private _res: ResultadosService) {

  }
  ngOnInit(): void {
    this.expediente=sessionStorage.getItem('Expediente');
    this.id = this.route.snapshot.paramMap.get('id');
    this.cargarResBDIDP();
/*     this.cargarTotalBDIDP(); */
  }

  cargarResBDIDP() {
    this._res.GetResultadosBDIDPList(this.id).subscribe(
      fu => {
        this.resultados = fu;
        console.log(this.resultados);
      }, error => {
        console.log(error);
        //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }

/*   cargarTotalBDIDP() {
    this._res.GetTotalBDIDP(this.id).subscribe(
      fu => {
        this.total = fu;
        console.log(this.total);
      }, error => {
        console.log(error);
        //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  } */
}
