import { Comentarios } from '@/models/Comentarios';
import { Tratamiento } from '@/models/Tratamiento';
import { DatePipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RichTextEditorComponent } from '@pages/rich-text-editor/rich-text-editor.component';
import { AppService } from '@services/app.service';
import { ComentariosService } from '@services/comentarios.service';
import { SharednumberService } from '@services/sharednumber.service';
import { TratamientoService } from '@services/tratamiento.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-tratamiento',
  templateUrl: './tratamiento.component.html',
  styleUrls: ['./tratamiento.component.scss']
})
export class TratamientoComponent {
  @ViewChild(RichTextEditorComponent) richTextEditor!: RichTextEditorComponent;
  expediente!: any;
  Sessiontab!: any;
  trata:Tratamiento= new Tratamiento();
  tratalist: Tratamiento[];
  Indextab:any;
  com:Comentarios=new Comentarios();
  comentarios: Comentarios[];
  fecCom:any;
  UsuarioId: any;
  UsuarioNombre: any;
  constructor(
    private _tr: TratamientoService, 
    private sharednumber:SharednumberService,
    private datePipe: DatePipe,
    private _com:ComentariosService,
    private appService: AppService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  
    this.expediente=localStorage.getItem('Expediente');
    this.Sessiontab=localStorage.getItem('IndexTab');
    this.UsuarioId=localStorage.getItem('UserId');
    this.UsuarioNombre=localStorage.getItem('UserName');
    this.sharednumber.numero$.subscribe(val=>
      {
        this.Indextab=val;
        if(this.Indextab==11||this.Sessiontab==11){
          this.cargarTrata();
          this.cargarComentarios();
        }
      });
   
    
   
  }

  GuardarTrata(){
  
    this.trata.trata_paciente_id=this.expediente;
    const contenidoEditor = this.richTextEditor.getContent();
    this.trata.trata_tecnica=contenidoEditor;
    this._tr.GuardarTratamiento(this.trata).subscribe(datos => {
      
      if(datos){
        swal.fire('Guardando Datos', `Datos Guardados Exitosamente!`, 'success');
        this.trata= new Tratamiento();
        this.richTextEditor.clearContent();
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
    const contenidoEditor = this.richTextEditor.getContent();
    this.trata.trata_tecnica=contenidoEditor;
    this._tr.UpdateTratamiento(trata).subscribe(dp => {
      
        swal.fire('Actualizando Datos', `Actualización Exitosa!`, 'success');
     /*    this.trata.trata_objetivo='';
        this.trata.trata_tecnica=''; */
        this.trata= new Tratamiento();
        this.richTextEditor.clearContent();
       

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
  limpiar(){
    console.log(this.trata);
    this.trata.trata_objetivo="";
    this.trata.trata_tecnica="";
    this.richTextEditor.clearContent();
  }

  GuardarComentario(){
    console.log(this.expediente);
    console.log(this.com);
    this.com.com_index=Number(this.Indextab);
    this.com.com_paciente_id=Number(this.expediente);
    this.com.com_usuario_id=Number(this.UsuarioId);
    this.com.com_nombre_usuario=this.UsuarioNombre;
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
    var indice:number=Number(this.Indextab);
    var id_expediente:number=Number(this.expediente);
    this._com.GetComentariosList(indice,id_expediente).subscribe(
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
