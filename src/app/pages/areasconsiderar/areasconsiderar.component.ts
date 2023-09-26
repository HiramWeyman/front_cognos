import { Otras } from '@/models/Otras';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OtrasService } from '@services/otras.service';
import { Subscription } from 'rxjs';
import swal from 'sweetalert2';
@Component({
  selector: 'app-areasconsiderar',
  templateUrl: './areasconsiderar.component.html',
  styleUrls: ['./areasconsiderar.component.scss']
})
export class AreasconsiderarComponent {
  expediente!: any;
  otras:Otras= new Otras();
  habilita:boolean=false;
  private subscription: Subscription;
  constructor(
    private _otras: OtrasService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.expediente=sessionStorage.getItem('Expediente');
    this.cargarOtras();
   
  }

  Guardar(){
  
    this.otras.otras_paciente_id=this.expediente;
    this._otras.GuardarOtras(this.otras).subscribe(datos => {
      
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
    this._otras.UpdateOtras(this.otras).subscribe(dp => {
      
        swal.fire('Actualizando Datos', `Actualización Exitosa!`, 'success');
        this.ngOnInit();
    
    },error => {
      console.log(error);
      //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
    });
  }


  cargarOtras() {
    this._otras.GetOtras(this.expediente).subscribe(
      fu => {
        this.otras = fu;
        //console.log(this.otras);
        if(this.otras!=null){
          this.habilita=true;
        }
      }, error => {
        console.log(error);
        //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }
}
