import { Comentarios } from '@/models/Comentarios';
import { SaludFM } from '@/models/SaludFM';
import { DatePipe } from '@angular/common';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { RichTextEditorComponent } from '@pages/rich-text-editor/rich-text-editor.component';
import { AppService } from '@services/app.service';
import { ComentariosService } from '@services/comentarios.service';
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


export class SaludfisicaComponent implements OnInit {
  @ViewChildren(RichTextEditorComponent) richTextEditors!: QueryList<RichTextEditorComponent>;
  editorContent1: any;
  editorContent2: any;
  editorContent3: any;
  
  Sueno: string = '<p>Sueño</p>';
  Alimentacion: string = '<p>Alimentación</p>';
  ActFisica: string = '<p>Actividad Fisica</p>';
  expediente!: any;
  Sessiontab!: any;
  Indextab: any;
  UsuarioId: any;
  UsuarioNombre: any;
  salud: SaludFM = new SaludFM();
  habilita: boolean = false;
  com: Comentarios = new Comentarios();
  comentarios: Comentarios[];
  fecCom: any;

  private subscription: Subscription;
  constructor(
    private _salu: SaludfmService,
    private router: Router,
    private sharednumber: SharednumberService,
    private _com: ComentariosService,
    private datePipe: DatePipe,
    private appService: AppService
  ) { }




  numero$ = this.sharednumber.numero$
  ngOnInit(): void {

    this.expediente = localStorage.getItem('Expediente');
    this.Sessiontab = localStorage.getItem('IndexTab');
    this.UsuarioId = localStorage.getItem('UserId');
    this.UsuarioNombre = localStorage.getItem('UserName');



    this.sharednumber.numero$.subscribe(val => {
      this.Indextab = val;
      if (this.Indextab == 1 || this.Sessiontab == 1) {
        this.cargarSalud();
        this.cargarComentarios();
      }
    });
  }




  Guardar() {
    console.log(this.expediente);
    console.log(this.salud);
    this.salud.salud_paciente_id = this.expediente;
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

    this.salud.salud_sueno_desc=this.editorContent1;
    this.salud.salud_alimentacion_desc=this.editorContent2;
    this.salud.salud_act_fisica_desc=this.editorContent3;
    if(!this.salud.salud_sueno_desc){
      swal.fire({ title: 'info!!!', text: 'Requiere descripción de sueño', icon: 'info' });
      return;
    }
    if(!this.salud.salud_alimentacion_desc){
      swal.fire({ title: 'info!!!', text: 'Requiere descripción de alimenración', icon: 'info' });
      return;
    }
    if(!this.salud.salud_act_fisica_desc){
      swal.fire({ title: 'info!!!', text: 'Requiere descripción de actividad fisica', icon: 'info' });
      return;
    } 
    this._salu.GuardarSalud(this.salud).subscribe(datos => {

      if (datos) {
        swal.fire('Guardando Datos', `Datos Guardados Exitosamente!`, 'success');
      }
      this.ngOnInit();

    }, error => {
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

    this.salud.salud_sueno_desc=this.editorContent1;
    this.salud.salud_alimentacion_desc=this.editorContent2;
    this.salud.salud_act_fisica_desc=this.editorContent3;
    this._salu.UpdateSalud(this.salud).subscribe(dp => {

      swal.fire('Actualizando Datos', `Actualización Exitosa!`, 'success');
      this.ngOnInit();

    }, error => {
      console.log(error);
      //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
    });
  }



  cargarSalud() {
    this._salu.GetSalud(this.expediente).subscribe(
      Salud => {
        this.salud = Salud;
        //console.log(this.salud);
        if (this.salud != null) {
          this.habilita = true;
        }
      }, error => {
        console.log(error);
        //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }


  GuardarComentario() {
    console.log(this.expediente);
    console.log(this.com);
    this.com.com_index = Number(this.Indextab);
    this.com.com_paciente_id = Number(this.expediente);
    this.com.com_usuario_id = Number(this.UsuarioId);
    this.com.com_nombre_usuario = this.UsuarioNombre;


    if (!this.com.com_comentario) {
      swal.fire('Guardando Comentario', `Debe escribir un comentario!`, 'info');
      return;
    }
    this._com.GuardarComentarios(this.com).subscribe(datos => {

      if (datos) {
        swal.fire('Guardando Comentario', `Comentario Guardado Exitosamente!`, 'success');
        this.com = new Comentarios();
      }
      this.ngOnInit();

    }, error => {
      console.log(error);
      //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
    });
  }

  cargarComentarios() {
    var indice: number = Number(this.Indextab);
    var id_expediente: number = Number(this.expediente);
    this._com.GetComentariosList(indice, id_expediente).subscribe(
      se => {

        this.comentarios = se;
        console.log(this.comentarios);
        for (let i = 0; i < this.comentarios.length; i++) {
          this.fecCom = this.datePipe.transform(this.comentarios[i].com_fecha_captura, "dd/MM/yyyy");
          this.comentarios[i].com_fecha_captura = this.fecCom;
        }
        console.log(this.comentarios);
      }, error => {
        console.log(error);
        /*  Swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });  */
      });
  }
}


