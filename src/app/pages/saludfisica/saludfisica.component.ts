import { SaludFM } from '@/models/SaludFM';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SaludfmService } from '@services/saludfm.service';
import { SharednumberService } from '@services/sharednumber.service';
import { Subscription } from 'rxjs';
import swal from 'sweetalert2';
declare var CKEDITOR: any;
@Component({
  selector: 'app-saludfisica',
  templateUrl: './saludfisica.component.html',
  styleUrls: ['./saludfisica.component.scss']
})


export class SaludfisicaComponent implements OnInit{
  Sueno: string = '<p>Sueño</p>';
  Alimentacion: string = '<p>Alimentación</p>';
  ActFisica: string = '<p>Actividad Fisica</p>';
  expediente!: any;
  Indextab: any ;
  salud:SaludFM= new SaludFM();
  habilita:boolean=false;
  v
  private subscription: Subscription;
  constructor(
    private _salu: SaludfmService,
    private router: Router,
    private sharednumber:SharednumberService
  ) { }

  numero$ = this.sharednumber.numero$
  ngOnInit(): void {
    
    this.expediente=sessionStorage.getItem('Expediente');
    this.sharednumber.numero$.subscribe(val=>
      {
        this.Indextab=val;
        if(this.Indextab==1){
          this.cargarSalud();
        }
      });
   
  }

/*   ngAfterViewInit(){
    console.log(this.sharednumber.resp());
  } */


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
        //console.log(this.salud);
        if(this.salud!=null){
          this.habilita=true;
        }
      }, error => {
        console.log(error);
        //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }
}


