import { Otras } from '@/models/Otras';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OtrasService } from '@services/otras.service';
import { SharednumberService } from '@services/sharednumber.service';
import { Subscription } from 'rxjs';
import swal from 'sweetalert2';
@Component({
  selector: 'app-areasconsiderar',
  templateUrl: './areasconsiderar.component.html',
  styleUrls: ['./areasconsiderar.component.scss']
})
export class AreasconsiderarComponent {
  expediente!: any;
  Sessiontab!: any;
  otras:Otras= new Otras();
  habilita:boolean=false;
  Indextab:any;
  private subscription: Subscription;
  constructor(
    private _otras: OtrasService,
    private router: Router,
    private sharednumber:SharednumberService
  ) { }
  ngOnInit(): void {
    this.expediente=sessionStorage.getItem('Expediente');
    this.Sessiontab=sessionStorage.getItem('IndexTab');
    this.sharednumber.numero$.subscribe(val=>
      {
        this.Indextab=val;
        if(this.Indextab==7||this.Sessiontab==7){
          this.cargarOtras();
        }
      });
   
   
  }

  Guardar(){
    if(!this.otras.otras_autocontrol){
      swal.fire('Guardando Datos', `Escriba una descripción en Autocontrol!`, 'info');
      return;
    }
    if(!this.otras.otras_aspectos_m){
      swal.fire('Guardando Datos', `Escriba una descripción en Aspectos motivacionales.!`, 'info');
      return;
    }
    if(!this.otras.otras_recursos_p){
      swal.fire('Guardando Datos', `Escriba una descripción en Recursos personales!`, 'info');
      return;
    }
    if(!this.otras.otras_apoyo_s){
      swal.fire('Guardando Datos', `Escriba una descripción en Apoyo social!`, 'info');
      return;
    }
    if(!this.otras.otras_situacion_v){
      swal.fire('Guardando Datos', `Escriba una descripción en Situación vital y estilo de vida!`, 'info');
      return;
    }
  
  
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
