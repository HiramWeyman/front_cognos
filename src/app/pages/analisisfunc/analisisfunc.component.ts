import { AnalisisFU } from '@/models/AnalisisFU';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AnalisisFuService } from '@services/analisisfu.service';
import { SharednumberService } from '@services/sharednumber.service';
import { Subscription } from 'rxjs';
import swal from 'sweetalert2';
@Component({
  selector: 'app-analisisfunc',
  templateUrl: './analisisfunc.component.html',
  styleUrls: ['./analisisfunc.component.scss']
})
export class AnalisisfuncComponent {
  antecedentes: string = '<p>Antecedentes</p>';
  conducta: string = '<p>Conducta</p>';
  consecuentes: string = '<p>Consecuentes</p>';
  expediente!: any;
  Sessiontab!: any;
  analisis:AnalisisFU= new AnalisisFU();
  habilita:boolean=false;
  Indextab: any ;
  private subscription: Subscription;
  constructor(
    private _analisis: AnalisisFuService,
    private router: Router,
    private sharednumber:SharednumberService
  ) { }
  ngOnInit(): void {
    this.expediente=sessionStorage.getItem('Expediente');
    this.Sessiontab=sessionStorage.getItem('IndexTab');
    this.sharednumber.numero$.subscribe(val=>
      {
        this.Indextab=val;
        if(this.Indextab==4||this.Sessiontab==4){
          this.cargarAnalisis();
        }
      });
    
   
  }

  Guardar(){
  
    this.analisis.analisis_paciente_id=this.expediente;
    this._analisis.GuardarAnalisis(this.analisis).subscribe(datos => {
      
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
    this._analisis.UpdateAnalisis(this.analisis).subscribe(dp => {
      
        swal.fire('Actualizando Datos', `Actualización Exitosa!`, 'success');
        this.ngOnInit();
    
    },error => {
      console.log(error);
      //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
    });
  }


  cargarAnalisis() {
    this._analisis.GetAnalisis(this.expediente).subscribe(
      fu => {
        this.analisis = fu;
        //console.log(this.analisis);
        if(this.analisis!=null){
          this.habilita=true;
        }
      }, error => {
        console.log(error);
        //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }
}
