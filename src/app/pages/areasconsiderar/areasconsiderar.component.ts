import { Comentarios } from '@/models/Comentarios';
import { Otras } from '@/models/Otras';
import { DatePipe } from '@angular/common';
import { Component, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { RichTextEditorComponent } from '@pages/rich-text-editor/rich-text-editor.component';
/* import { AngularEditorConfig } from '@kolkov/angular-editor'; */
import { AppService } from '@services/app.service';
import { ComentariosService } from '@services/comentarios.service';
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
  @ViewChildren(RichTextEditorComponent) richTextEditors!: QueryList<RichTextEditorComponent>;
  editorContent1: any;
  editorContent2: any;
  editorContent3: any;
  editorContent4: any;
  editorContent5: any;

  expediente!: any;
  Sessiontab!: any;
  otras:Otras= new Otras();
  habilita:boolean=false;
  Indextab:any;
  com:Comentarios=new Comentarios();
  comentarios: Comentarios[];
  fecCom:any;
  UsuarioId: any;
  UsuarioNombre: any;

  private subscription: Subscription;
  constructor(
    private _otras: OtrasService,
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
        if(this.Indextab==7||this.Sessiontab==7){
          this.cargarOtras();
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
    if (editorsArray.length > 2) {
      this.editorContent3 = editorsArray[2].getContent();
    }
    if (editorsArray.length > 3) {
      this.editorContent4 = editorsArray[3].getContent();
    }
    if (editorsArray.length > 4) {
      this.editorContent5 = editorsArray[4].getContent();
    }

    this.otras.otras_autocontrol=this.editorContent1;
    this.otras.otras_aspectos_m=this.editorContent2;
    this.otras.otras_recursos_p=this.editorContent3;
    this.otras.otras_apoyo_s=this.editorContent4;
    this.otras.otras_situacion_v=this.editorContent5;

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
    this.otras.otras_titulo="x";
    this.otras.otras_desc="y";
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
    const editorsArray = this.richTextEditors.toArray();
    if (editorsArray.length > 0) {
      this.editorContent1 = editorsArray[0].getContent();
    }
    if (editorsArray.length > 1) {
      this.editorContent2 = editorsArray[1].getContent();
    }
    if (editorsArray.length > 2) {
      this.editorContent3 = editorsArray[2].getContent();
    }
    if (editorsArray.length > 3) {
      this.editorContent4 = editorsArray[3].getContent();
    }
    if (editorsArray.length > 4) {
      this.editorContent5 = editorsArray[4].getContent();
    }

    this.otras.otras_autocontrol=this.editorContent1;
    this.otras.otras_aspectos_m=this.editorContent2;
    this.otras.otras_recursos_p=this.editorContent3;
    this.otras.otras_apoyo_s=this.editorContent4;
    this.otras.otras_situacion_v=this.editorContent5;
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
        console.log(this.otras);
        if(this.otras!=null){
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
