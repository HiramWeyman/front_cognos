import { Creencias } from '@/models/Creencias';
import { Component, ElementRef, OnInit } from '@angular/core';
import { CreenciasService } from '@services/creencias.service';
import { SharednumberService } from '@services/sharednumber.service';
/* import { Chart } from 'chart.js'; */
import Chart from 'chart.js/auto';
import swal from 'sweetalert2';

@Component({
  selector: 'app-ideasirracionales',
  templateUrl: './ideasirracionales.component.html',
  styleUrls: ['./ideasirracionales.component.scss']
})
export class IdeasirracionalesComponent implements OnInit {
  title = 'chartDemo';
  myChart: any;
  habilita: boolean = false;
  creencia: Creencias = new Creencias();
  expediente!: any;
  Indextab: any;
  Sessiontab!: any;
  creencia1:number;
  creencia2:number;
  creencia3:number;
  creencia4:number;
  creencia5:number;
  creencia6:number;
  creencia7:number;
  creencia8:number;
  creencia9:number;
  creencia10:number;

   arr: Array<any>;
  constructor(
    private elementRef: ElementRef,
    private _cree: CreenciasService,
    private sharednumber: SharednumberService) {
  }

  ngOnInit() {
    this.expediente = sessionStorage.getItem('Expediente');
  
    this.sharednumber.numero$.subscribe(val => {
      this.Indextab = val;
      if (this.Indextab == 12 || this.Sessiontab == 12) {
        this.cargarCreencias();
        //this.chartit();

      }
    });

  }



  cargarCreencias() {
    this._cree.GetCreencias(this.expediente).subscribe(
      fu => {
        this.creencia = fu;
        console.log(this.creencia);
        if (this.creencia != null) {

          const array = [];
         
          
          array.push(Number(this.creencia.creencia_irra1));
          array.push(this.creencia.creencia_irra2);
          array.push(this.creencia.creencia_irra3);
          array.push(this.creencia.creencia_irra4);
          array.push(this.creencia.creencia_irra5);
          array.push(this.creencia.creencia_irra6);
          array.push(this.creencia.creencia_irra7);
          array.push(this.creencia.creencia_irra8);
          array.push(this.creencia.creencia_irra9);
          array.push(this.creencia.creencia_irra10); 


          let htmlRef = this.elementRef.nativeElement.querySelector(`#myChart`);
          if (this.myChart) {
            this.myChart.destroy();
          }
          this.myChart = new Chart(htmlRef, {
            type: 'bar',
            data: {
              labels: ['Irrac1', 'Irrac2', 'Irrac3', 'Irrac4', 'Irrac5', 'Irrac6', 'Irrac7', 'Irrac8', 'Irrac9', 'Irrac10',],
              datasets: [{
                label: 'Ideas Irracionales',
                //data: [this.creencia1, this.creencia2, this.creencia3, this.creencia4, this.creencia5, this.creencia6, this.creencia7, this.creencia8, this.creencia9, this.creencia10],/*  */
                data: array,
                backgroundColor: "red",
                /* backgroundColor:"#0196FD", */
                borderColor: "#0196FD",
                borderWidth: 1
              },
                /*           {
                            label: 'Dat21',
                            data: [19, 12, 5, 3, 1, 6],
                            backgroundColor:"#FFAF00",
                            borderColor: "#FFAF00",
                            borderWidth: 1
                         } */
              ]
            },
            options: {
              scales: {
                y: {
                  min: 0,
                  max: 9,
                  /* beginAtZero: true */
                }
              }
            }
          });

          this.habilita = true;
          console.log(array);
        }
      }, error => {
        console.log(error);
        //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }

  Guardar() {
    this.creencia.creencia_paciente_id = this.expediente;
    this._cree.GuardarCreencias(this.creencia).subscribe(datos => {

      if (datos) {
        swal.fire('Guardando Datos', `Datos Guardados Exitosamente!`, 'success');
      }
      this.ngOnInit();

    }, error => {
      console.log(error);
      //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
    });
  }

  UpdateDatos(): void {
    this._cree.UpdateCreencias(this.creencia).subscribe(dp => {

      swal.fire('Actualizando Datos', `Actualización Exitosa!`, 'success');
      this.ngOnInit();

    }, error => {
      console.log(error);
      //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
    });
  }

}
