import { Comentarios } from '@/models/Comentarios';
import { Evolucion } from '@/models/Evolucion';
import { DatePipe } from '@angular/common';
import { Component, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { RichTextEditorComponent } from '@pages/rich-text-editor/rich-text-editor.component';
import { AppService } from '@services/app.service';
import { ComentariosService } from '@services/comentarios.service';
import { EvolucionService } from '@services/evolucion.service';
import { SharednumberService } from '@services/sharednumber.service';
import { Subscription } from 'rxjs';
import swal from 'sweetalert2';
@Component({
  selector: 'app-evoproblema',
  templateUrl: './evoproblema.component.html',
  styleUrls: ['./evoproblema.component.scss']
})
export class EvoproblemaComponent {
  @ViewChildren(RichTextEditorComponent) richTextEditors!: QueryList<RichTextEditorComponent>;
  editorContent1: any;
  editorContent2: any;
  evoproblema: string = '<p>Evoloción de problema</p>';
  expediente!: any;
  Sessiontab!: any;
  evolucion:Evolucion= new Evolucion();
  habilita:boolean=false;
  Indextab: any;
  com:Comentarios=new Comentarios();
  comentarios: Comentarios[];
  fecCom:any;
  UsuarioId: any;
  UsuarioNombre: any;
  private subscription: Subscription;
  constructor(
    private _evo: EvolucionService,
    private router: Router,
    private sharednumber:SharednumberService,
    private datePipe: DatePipe,
    private _com:ComentariosService,
    private appService: AppService
  ) { }


  ngOnInit(): void {
  
    this.expediente=localStorage.getItem('Expediente');
    this.Sessiontab=localStorage.getItem('IndexTab');
    this.UsuarioId=localStorage.getItem('UserId');
    this.UsuarioNombre=localStorage.getItem('UserName');
    this.sharednumber.numero$.subscribe(val=>
      {
        this.Indextab=val;
        if(this.Indextab==5||this.Sessiontab==5){
          this.cargarEvolucion();
          this.cargarComentarios();
        }
      });

  }

  Guardar(){
    const editorsArray = this.richTextEditors.toArray();
    if (editorsArray.length > 0) {
      this.editorContent1 = editorsArray[0].getContent();
    }
    if (editorsArray.length > 1) {
      this.editorContent2 = editorsArray[1].getContent();
    }
    this.evolucion.evo_factores= this.editorContent1;
    this.evolucion.evo_curso_problema= this.editorContent2;

    if(!this.evolucion.evo_factores){
      swal.fire('Guardando Datos', `Escriba una descripción en Factores predisponentes o de vulnerabilidad!`, 'info');
      return;
    }
    if(!this.evolucion.evo_curso_problema){
      swal.fire('Guardando Datos', `Escriba una descripción en Aparición y curso del problema.!`, 'info');
      return;
    }
    this.evolucion.evo_paciente_id=this.expediente;
    this._evo.GuardarEvo(this.evolucion).subscribe(datos => {
      
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
    const editorsArray = this.richTextEditors.toArray();
    if (editorsArray.length > 0) {
      this.editorContent1 = editorsArray[0].getContent();
    }
    if (editorsArray.length > 1) {
      this.editorContent2 = editorsArray[1].getContent();
    }
    this.evolucion.evo_factores= this.editorContent1;
    this.evolucion.evo_curso_problema= this.editorContent2;
    this._evo.UpdateEvo(this.evolucion).subscribe(dp => {
      
        swal.fire('Actualizando Datos', `Actualización Exitosa!`, 'success');
        this.ngOnInit();
    
    },error => {
      console.log(error);
      //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
    });
  }


  cargarEvolucion() {
    this._evo.GetEvo(this.expediente).subscribe(
      fu => {
        this.evolucion = fu;
        //console.log(this.evolucion);
        if(this.evolucion!=null){
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
