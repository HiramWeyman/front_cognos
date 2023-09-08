import { Evolucion } from '@/models/Evolucion';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EvolucionService } from '@services/evolucion.service';
import { Subscription } from 'rxjs';
import swal from 'sweetalert2';
@Component({
  selector: 'app-evoproblema',
  templateUrl: './evoproblema.component.html',
  styleUrls: ['./evoproblema.component.scss']
})
export class EvoproblemaComponent {
  evoproblema: string = '<p>Evoloción de problema</p>';

  expediente!: any;
  evolucion:Evolucion= new Evolucion();
  habilita:boolean=false;
  private subscription: Subscription;
  constructor(
    private _evo: EvolucionService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.expediente=sessionStorage.getItem('Expediente');
    this.cargarEvolucion();
   
  }

  Guardar(){
  
    this.evolucion.evo_paciente_id=this.expediente;
    this._evo.GuardarEvo(this.evolucion).subscribe(datos => {
      
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
    this._evo.UpdateEvo(this.evolucion).subscribe(dp => {
      
        swal.fire('Actualizando Datos', `Actualización Exitosa!`, 'success');
        this.ngOnInit();
    
    },error => {
      console.log(error);
      //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
    });
  }


  cargarEvolucion() {
    this._evo.GetEvo(this.expediente).subscribe(
      fu => {
        this.evolucion = fu;
        console.log(this.evolucion);
        if(this.evolucion!=null){
          this.habilita=true;
        }
      }, error => {
        console.log(error);
        //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }
}
