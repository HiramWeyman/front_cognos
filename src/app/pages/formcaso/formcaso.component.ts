import { Evolucion } from '@/models/Evolucion';
import { FormCaso } from '@/models/FormCaso';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EvolucionService } from '@services/evolucion.service';
import { FormCasoService } from '@services/formcaso.service';
import { SharednumberService } from '@services/sharednumber.service';
import { Subscription } from 'rxjs';
import swal from 'sweetalert2';

@Component({
  selector: 'app-formcaso',
  templateUrl: './formcaso.component.html',
  styleUrls: ['./formcaso.component.scss']
})
export class FormcasoComponent {
  expediente!: any;
  Sessiontab!: any;
  caso:FormCaso= new FormCaso();
  habilita:boolean=false;
  Indextab: any;
  constructor(
    private _frm: FormCasoService,
    private router: Router,
    private sharednumber:SharednumberService
  ) { }
  ngOnInit(): void {
    this.expediente=sessionStorage.getItem('Expediente');
    this.Sessiontab=sessionStorage.getItem('IndexTab');
    this.sharednumber.numero$.subscribe(val=>
      {
        this.Indextab=val;
        if(this.Indextab==9||this.Sessiontab==9){
          this.cargarFormCaso();
        }
      });
  }

  Guardar(){
  
    if(!this.caso.form_hipotesis){
      swal.fire('Guardando Datos', `Escriba una descripción en Hipótesis de Origen y mantenimiento!`, 'info');
      return;
    }
    if(!this.caso.form_contraste){
      swal.fire('Guardando Datos', `Escriba una descripción en Contraste de hipótesis!`, 'info');
      return;
    }
    this.caso.form_paciente_id=this.expediente;
    this._frm.Guardarform(this.caso).subscribe(datos => {
      
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
    this._frm.Updateform(this.caso).subscribe(dp => {
      
        swal.fire('Actualizando Datos', `Actualización Exitosa!`, 'success');
        this.ngOnInit();
    
    },error => {
      console.log(error);
      //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
    });
  }


  cargarFormCaso() {
    this._frm.Getform(this.expediente).subscribe(
      fu => {
        this.caso = fu;
        //console.log(this.evolucion);
        if(this.caso!=null){
          this.habilita=true;
        }
      }, error => {
        console.log(error);
        //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }
}
