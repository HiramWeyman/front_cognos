import { Tratamiento } from '@/models/Tratamiento';
import { Component } from '@angular/core';
import { SharednumberService } from '@services/sharednumber.service';
import { TratamientoService } from '@services/tratamiento.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-tratamiento',
  templateUrl: './tratamiento.component.html',
  styleUrls: ['./tratamiento.component.scss']
})
export class TratamientoComponent {
  expediente!: any;
  trata:Tratamiento= new Tratamiento();
  tratalist: Tratamiento[];
  Indextab:any;
  constructor(
    private _tr: TratamientoService, private sharednumber:SharednumberService
  ) { }

  ngOnInit(): void {
    this.expediente=sessionStorage.getItem('Expediente');
    this.sharednumber.numero$.subscribe(val=>
      {
        this.Indextab=val;
        if(this.Indextab==10){
          this.cargarTrata();
        }
      });
   
    
   
  }

  GuardarTrata(){
  
    this.trata.trata_paciente_id=this.expediente;
    this._tr.GuardarTratamiento(this.trata).subscribe(datos => {
      
      if(datos){
        swal.fire('Guardando Datos', `Datos Guardados Exitosamente!`, 'success');
        this.trata.trata_objetivo='';
        this.trata.trata_tecnica='';
      }
      this.ngOnInit();

    },error => {
      console.log(error);
      //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
    });
  }

  getDatosTrata(id:number){
    this._tr.GetTratamiento(id).subscribe(
      fu => {
      
        this.trata = fu;
        //console.log(this.trata);
      }, error => {
        console.log(error);
        //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }
  

  UpdateDatosTrata(trata:Tratamiento): void {
    this._tr.UpdateTratamiento(trata).subscribe(dp => {
      
        swal.fire('Actualizando Datos', `Actualización Exitosa!`, 'success');
        this.trata= new Tratamiento();
        this.ngOnInit();
    
    },error => {
      console.log(error);
      //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
    });
  }

  DeleteDatosTrata(id:number): void {
    this._tr.DelTratamiento(id).subscribe(dp => {
      
        swal.fire('Borrando Registro', `Registro Eliminado!`, 'success');
        this.ngOnInit();
    
    },error => {
      console.log(error);
      //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
    });
  }

  cargarTrata() {
    this._tr.GetTratamientoList(this.expediente).subscribe(
      fu => {
        this.tratalist = fu;
       
        //console.log(this.tratalist);
      }, error => {
        console.log(error);
        //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }
}
