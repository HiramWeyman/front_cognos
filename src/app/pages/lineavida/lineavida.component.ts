import { LineaVida } from '@/models/LineaVida';
import { Component } from '@angular/core';
import { LineaService } from '@services/lineavida.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-lineavida',
  templateUrl: './lineavida.component.html',
  styleUrls: ['./lineavida.component.scss']
})
export class LineavidaComponent {
  expediente!: any;
  linea:LineaVida= new LineaVida();
  linealist: LineaVida[];
  constructor(
    private _pr: LineaService,
  ) { }

  ngOnInit(): void {
    this.expediente=sessionStorage.getItem('Expediente');
    this.cargarLinea();

  }


  GuardarLinea(){
  
    this.linea.lin_paciente_id=this.expediente;
    this._pr.GuardarLinea(this.linea).subscribe(datos => {
      
      if(datos){
        swal.fire('Guardando Datos', `Datos Guardados Exitosamente!`, 'success');
        this.linea.lin_titulo='';
        this.linea.lin_desc='';
      }
      this.ngOnInit();

    },error => {
      console.log(error);
      //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
    });
  }

  getDatosLinea(id:number){
    this._pr.GetLinea(id).subscribe(
      fu => {
      
        this.linea = fu;
        console.log(this.linea);
      }, error => {
        console.log(error);
        //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }
  

  UpdateDatosLinea(Linea:LineaVida): void {
    this._pr.UpdateLinea(Linea).subscribe(dp => {
      
        swal.fire('Actualizando Datos', `Actualización Exitosa!`, 'success');
        this.linea= new LineaVida();
        this.ngOnInit();
    
    },error => {
      console.log(error);
      //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
    });
  }

  DeleteDatosLinea(id:number): void {
    this._pr.DelLinea(id).subscribe(dp => {
      
        swal.fire('Borrando Registro', `Registro Eliminado!`, 'success');
        this.ngOnInit();
    
    },error => {
      console.log(error);
      //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
    });
  }

  cargarLinea() {
    this._pr.GetLineaList(this.expediente).subscribe(
      fu => {
        this.linealist = fu;
       
        console.log(this.linealist);
      }, error => {
        console.log(error);
        //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }

}
