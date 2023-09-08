import { Diagnostico } from '@/models/Diagnostico';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DiagnosticoService } from '@services/diagnostico.service';
import { Subscription } from 'rxjs';
import swal from 'sweetalert2';

@Component({
  selector: 'app-diagnostico',
  templateUrl: './diagnostico.component.html',
  styleUrls: ['./diagnostico.component.scss']
})
export class DiagnosticoComponent {
  diagnostico: string = '<p>Diagnostico</p>';
  expediente!: any;
  diag:Diagnostico= new Diagnostico();
  habilita:boolean=false;
  private subscription: Subscription;
  constructor(
    private _diag: DiagnosticoService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.expediente=sessionStorage.getItem('Expediente');
    this.cargarDiagnostico();
   
  }

  Guardar(){
  
    this.diag.diag_paciente_id=this.expediente;
    this._diag.GuardarDiagnostico(this.diag).subscribe(datos => {
      
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
    this._diag.UpdateDiagnostico(this.diag).subscribe(dp => {
      
        swal.fire('Actualizando Datos', `Actualización Exitosa!`, 'success');
        this.ngOnInit();
    
    },error => {
      console.log(error);
      //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
    });
  }


  cargarDiagnostico() {
    this._diag.GetDiagnostico(this.expediente).subscribe(
      fu => {
        this.diag = fu;
        console.log(this.diag);
        if(this.diag!=null){
          this.habilita=true;
        }
      }, error => {
        console.log(error);
        //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }
}
