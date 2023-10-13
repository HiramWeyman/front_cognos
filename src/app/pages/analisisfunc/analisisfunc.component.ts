import { AnalisisFU } from '@/models/AnalisisFU';
import { Comentarios } from '@/models/Comentarios';
import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AnalisisFuService } from '@services/analisisfu.service';
import { ComentariosService } from '@services/comentarios.service';
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
  com:Comentarios=new Comentarios();
  comentarios: Comentarios[];
  fecCom:any;
  UsuarioId: any;
  UsuarioNombre: any;
  private subscription: Subscription;
  constructor(
    private _analisis: AnalisisFuService,
    private router: Router,
    private sharednumber:SharednumberService,
    private datePipe: DatePipe,
    private _com:ComentariosService
  ) { }
  ngOnInit(): void {
    this.expediente=sessionStorage.getItem('Expediente');
    this.Sessiontab=sessionStorage.getItem('IndexTab');
    this.UsuarioId=sessionStorage.getItem('UserId');
    this.UsuarioNombre=sessionStorage.getItem('UserName');
    this.sharednumber.numero$.subscribe(val=>
      {
        this.Indextab=val;
        if(this.Indextab==4||this.Sessiontab==4){
          this.cargarAnalisis();
          this.cargarComentarios();
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

  GuardarComentario(){
    console.log(this.expediente);
    console.log(this.com);
    this.com.com_index=this.Sessiontab;
    this.com.com_nombre_usuario=this.UsuarioNombre;
    this.com.com_usuario_id=this.UsuarioId;
    this.com.com_paciente_id=this.expediente;
    if(!this.com.com_comentario){
      swal.fire('Guardando Comentario', `Debe escribir un comentario!`, 'info');
      return;
    }
    this._com.GuardarComentarios(this.com).subscribe(datos => {
      
      if(datos){
        swal.fire('Guardando Comentario', `Comentario Guardado Exitosamente!`, 'success');
        this.com=new Comentarios();
      }
      this.ngOnInit();

    },error => {
      console.log(error);
      //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
    });
  }

  cargarComentarios() {
    this._com.GetComentariosList(this.Indextab,this.expediente).subscribe(
      se => {
      
        this.comentarios = se;
        console.log(this.comentarios);
        for(let i=0;i<this.comentarios.length;i++){
          this.fecCom =this.datePipe.transform(this.comentarios[i].com_fecha_captura,"dd/MM/yyyy");
          this.comentarios[i].com_fecha_captura= this.fecCom;
        }
        console.log(this.comentarios);
      }, error => {
        console.log(error);
        /*  Swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });  */
      });
  }
}
