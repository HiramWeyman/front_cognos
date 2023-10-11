import { Pacientes } from '@/models/Pacientes';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PacientesService } from '@services/pacientes.service';
import { Subscription } from 'rxjs';
import swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { SesionService } from '@services/sesiones.service';
import { Sesion } from '@/models/Sesion';
@Component({
  selector: 'app-regsesion',
  templateUrl: './regsesion.component.html',
  styleUrls: ['./regsesion.component.scss']
})
export class RegsesionComponent {
pac:Sesion=new Sesion();
private subscription: Subscription;
public userId: any = null;
public fnac: any = null;
public fing: any = null;
expediente!: any;
constructor(
  private _pac: SesionService,
  private router: Router,
  private datePipe: DatePipe
  
) {}
  ngOnInit(): void {
 
    this.expediente=sessionStorage.getItem('Expediente');
    console.log(this.expediente);
  }

  GuardarSesion(){
  
    this.pac.sesion_paciente_id=this.expediente;
    this.pac.sesion_caso=this.expediente;
  
    console.log(this.pac);
    this._pac.GuardarSesion(this.pac).subscribe(datos => {
      
      if(datos){
        swal.fire('Guardando Datos', `Datos Guardados Exitosamente!`, 'success');
        this.pac=new Sesion();
        this.router.navigate(['/exp',this.expediente]);
      }
   

    },error => {
      console.log(error);
      //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
    });
  }


    validateFormat(event) {
      let key;
      if (event.type === 'paste') {
        key = event.clipboardData.getData('text/plain');
      } else {
        key = event.keyCode;
        key = String.fromCharCode(key);
      }
      const regex = /[0-9]|\./;
       if (!regex.test(key)) {
        event.returnValue = false;
         if (event.preventDefault) {
          event.preventDefault();
         }
       }
      }
}
