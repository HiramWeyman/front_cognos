import { SaludFM } from '@/models/SaludFM';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SaludfmService } from '@services/saludfm.service';
import { Subscription } from 'rxjs';
import swal from 'sweetalert2';
declare var CKEDITOR: any;
@Component({
  selector: 'app-saludfisica',
  templateUrl: './saludfisica.component.html',
  styleUrls: ['./saludfisica.component.scss']
})


export class SaludfisicaComponent {
  Sueno: string = '<p>Sueño</p>';
  Alimentacion: string = '<p>Alimentación</p>';
  ActFisica: string = '<p>Actividad Fisica</p>';
  expediente!: any;
  salud:SaludFM= new SaludFM();
  habilita:boolean=false;
  private subscription: Subscription;
  constructor(
    private _salu: SaludfmService,
    private router: Router
  ) { }
  ngOnInit(): void {
    
    this.expediente=sessionStorage.getItem('Expediente');
    console.log('Expediente');
    console.log(this.expediente);
    this.cargarSalud();
   
  }
/*   Guardar(){
    console.log(this.expediente);
    console.log(this.salud);
    this.salud.salud_paciente_id=this.expediente;
    this._salu.GuardarSalud(this.salud)
        .subscribe((data: any) => {
          if(data!=null){
            swal.fire({
              icon: 'success',
              title: 'Guardando Datos',
              text: 'Datos Guardados Exitosamente ',
              timer: 2000
          });
          }
          else{
            swal.fire({
              icon: 'error',
              title: 'Guardando Datos',
              text: 'Ocurrio un error al guardar ',
              timer: 2000
          });
          }
        this.ngOnInit();
        },
        error => {
            //console.log(error.error.Message);
            swal.fire({
                title: 'ERROR!!!',
                text: error.error.Message,
                icon: 'error'});
        });
  }
 */

  Guardar(){
    console.log(this.expediente);
    console.log(this.salud);
    this.salud.salud_paciente_id=this.expediente;
    this._salu.GuardarSalud(this.salud).subscribe(datos => {
      
      if(datos){
        swal.fire('Guardando Datos', `Datos Guardados Exitosamente!`, 'success');
      }
      this.ngOnInit();

    },error => {
      console.log(error);
      //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
    });
  }


  UpdateDatos(): void {
    this._salu.UpdateSalud(this.salud).subscribe(dp => {
      
        swal.fire('Actualizando Datos', `Actualización Exitosa!`, 'success');
        this.ngOnInit();
    
    },error => {
      console.log(error);
      //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
    });
  }

 

  cargarSalud() {
    this._salu.GetSalud(this.expediente).subscribe(
      Salud => {
        this.salud = Salud;
        console.log(this.salud);
        if(this.salud!=null){
          this.habilita=true;
        }
      }, error => {
        console.log(error);
        //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }
}


