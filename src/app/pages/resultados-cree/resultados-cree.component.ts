import { ResultadosCree } from '@/models/ResultadosCree';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResultadosService } from '@services/resultados.service';

@Component({
  selector: 'app-resultados-cree',
  templateUrl: './resultados-cree.component.html',
  styleUrls: ['./resultados-cree.component.scss']
})
export class ResultadosCreeComponent {
  id!: any;
  expediente!: any;
  resultados: ResultadosCree[];
  total1!:any;
  total2!:any;
  total3!:any;
  total4!:any;
  total5!:any;
  total6!:any;
  total7!:any;
  total8!:any;
  total9!:any;
  total10!:any;
/*   pac: Pacientes = new Pacientes(); */
  constructor(private route: ActivatedRoute, private _res: ResultadosService,) {

  }
  ngOnInit(): void {
    this.expediente=sessionStorage.getItem('Expediente');
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    this.cargarResCree();
    this.cargarTotalCree1();
    this.cargarTotalCree2();
    this.cargarTotalCree3();
    this.cargarTotalCree4();
    this.cargarTotalCree5();
    this.cargarTotalCree6();
    this.cargarTotalCree7();
    this.cargarTotalCree8();
    this.cargarTotalCree9();
    this.cargarTotalCree10();
  }

  cargarResCree() {
    this._res.GetResultadosCreeList(this.id).subscribe(
      fu => {
        this.resultados = fu;
        console.log(this.resultados);
      }, error => {
        console.log(error);
        //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }

  cargarTotalCree1() {
    this._res.GetCreeTotal1(this.id).subscribe(
      fu => {
        this.total1 = fu;
        console.log(this.total1);
      }, error => {
        console.log(error);
        //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }

  cargarTotalCree2() {
    this._res.GetCreeTotal2(this.id).subscribe(
      fu => {
        this.total2 = fu;
        console.log(this.total2);
      }, error => {
        console.log(error);
        //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }

  cargarTotalCree3() {
    this._res.GetCreeTotal3(this.id).subscribe(
      fu => {
        this.total3 = fu;
        console.log(this.total3);
      }, error => {
        console.log(error);
        //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }

  cargarTotalCree4() {
    this._res.GetCreeTotal1(this.id).subscribe(
      fu => {
        this.total4 = fu;
        console.log(this.total4);
      }, error => {
        console.log(error);
        //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }

  cargarTotalCree5() {
    this._res.GetCreeTotal5(this.id).subscribe(
      fu => {
        this.total5 = fu;
        console.log(this.total5);
      }, error => {
        console.log(error);
        //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }

  cargarTotalCree6() {
    this._res.GetCreeTotal6(this.id).subscribe(
      fu => {
        this.total6 = fu;
        console.log(this.total6);
      }, error => {
        console.log(error);
        //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }

  cargarTotalCree7() {
    this._res.GetCreeTotal7(this.id).subscribe(
      fu => {
        this.total7 = fu;
        console.log(this.total7);
      }, error => {
        console.log(error);
        //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }

  cargarTotalCree8() {
    this._res.GetCreeTotal8(this.id).subscribe(
      fu => {
        this.total8 = fu;
        console.log(this.total8);
      }, error => {
        console.log(error);
        //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }

  cargarTotalCree9() {
    this._res.GetCreeTotal9(this.id).subscribe(
      fu => {
        this.total9 = fu;
        console.log(this.total9);
      }, error => {
        console.log(error);
        //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }

  cargarTotalCree10() {
    this._res.GetCreeTotal10(this.id).subscribe(
      fu => {
        this.total10 = fu;
        console.log(this.total10);
      }, error => {
        console.log(error);
        //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }
}
