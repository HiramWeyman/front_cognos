import { AnalisisFU } from '@/models/AnalisisFU';
import { Comentarios } from '@/models/Comentarios';
import { DatePipe } from '@angular/common';
import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { AnalisisFuService } from '@services/analisisfu.service';
import { AppService } from '@services/app.service';
import { ComentariosService } from '@services/comentarios.service';
import { SharednumberService } from '@services/sharednumber.service';
import { Subscription } from 'rxjs';
import swal from 'sweetalert2';
import { RichTextEditorComponent } from '@pages/rich-text-editor/rich-text-editor.component';
declare const tinymce: any;
@Component({
  selector: 'app-analisisfunc',
  templateUrl: './analisisfunc.component.html',
  styleUrls: ['./analisisfunc.component.scss']
})
export class AnalisisfuncComponent {
/*   @ViewChild('editor') editorElement!: ElementRef; */
  @ViewChildren(RichTextEditorComponent) richTextEditors!: QueryList<RichTextEditorComponent>;
  editorContent1: any;
  editorContent2: any;
  editorContent3: any;


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
    private _com:ComentariosService,
    private appService: AppService
  ) { 


  }


  ngOnInit(): void {
 
    this.expediente=localStorage.getItem('Expediente');
    this.Sessiontab=localStorage.getItem('IndexTab');
    this.UsuarioId=localStorage.getItem('UserId');
    this.UsuarioNombre=localStorage.getItem('UserName');
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

    console.log('Contenido del editor 1:', this.editorContent1);
    console.log('Contenido del editor 2:', this.editorContent2);
    console.log('Contenido del editor 3:', this.editorContent3);

    this.analisis.analisis_ant_desc=this.editorContent1;
    this.analisis.analisis_con_desc=this.editorContent2;
    this.analisis.analisis_cons_desc=this.editorContent3;
    console.log(this.analisis.analisis_ant_desc);
   if(!this.analisis.analisis_ant_desc){
      swal.fire({ title: 'info!!!', text: 'Requiere descripción de antecedentes', icon: 'info' });
      return;
    }
    if(!this.analisis.analisis_con_desc){
      swal.fire({ title: 'info!!!', text: 'Requiere descripción de conducta', icon: 'info' });
      return;
    }
    if(!this.analisis.analisis_cons_desc){
      swal.fire({ title: 'info!!!', text: 'Requiere descripción de consecuentes', icon: 'info' });
      return;
    } 
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

    console.log('Contenido del editor 1:', this.editorContent1);
    console.log('Contenido del editor 2:', this.editorContent2);
    console.log('Contenido del editor 3:', this.editorContent3);

    this.analisis.analisis_ant_desc=this.editorContent1;
    this.analisis.analisis_con_desc=this.editorContent2;
    this.analisis.analisis_cons_desc=this.editorContent3;
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
