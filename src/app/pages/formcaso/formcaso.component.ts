import { Comentarios } from '@/models/Comentarios';
import { Evolucion } from '@/models/Evolucion';
import { FormCaso } from '@/models/FormCaso';
import { DatePipe } from '@angular/common';
import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { RichTextEditorComponent } from '@pages/rich-text-editor/rich-text-editor.component';
/* import { AngularEditorConfig } from '@kolkov/angular-editor'; */
import { AppService } from '@services/app.service';
import { ComentariosService } from '@services/comentarios.service';
import { PruebasService } from '@services/enviarpruebas.service';
import { EvolucionService } from '@services/evolucion.service';
import { FormCasoService } from '@services/formcaso.service';
import { SharednumberService } from '@services/sharednumber.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Subscription } from 'rxjs';
import swal from 'sweetalert2';

@Component({
  selector: 'app-formcaso',
  templateUrl: './formcaso.component.html',
  styleUrls: ['./formcaso.component.scss']
})
export class FormcasoComponent {
  @ViewChildren(RichTextEditorComponent) richTextEditors!: QueryList<RichTextEditorComponent>;
  editorContent1: any;
  editorContent2: any;

  @BlockUI()
  blockUI!: NgBlockUI;
  expediente!: any;
  Sessiontab!: any;
  caso: FormCaso = new FormCaso();
  habilita: boolean = false;
  Indextab: any;
  com: Comentarios = new Comentarios();
  comentarios: Comentarios[];
  fecCom: any;
  UsuarioId: any;
  UsuarioNombre: any;
  mycontent: string;
  log: string = '';
  diagrama!: File;
  diagramaFoto: any;
  resp: any;

  @ViewChild('myInputDiagrama')
  myInputDiagrama!: ElementRef;
  @ViewChild('myInputDiagramaUp')
  myInputDiagramaUp!: ElementRef;
  /*   @ViewChild("myckeditor3") ckeditor3: any; */
  constructor(
    private _frm: FormCasoService,
    private router: Router,
    private sharednumber: SharednumberService,
    private datePipe: DatePipe,
    private _com: ComentariosService,
    private _env: PruebasService,
    private appService: AppService
  ) {

  }

  ngOnInit(): void {

    this.expediente = localStorage.getItem('Expediente');
    this.Sessiontab = localStorage.getItem('IndexTab');
    this.UsuarioId = localStorage.getItem('UserId');
    this.UsuarioNombre = localStorage.getItem('UserName');
    this.sharednumber.numero$.subscribe(val => {
      this.Indextab = val;
      if (this.Indextab == 9 || this.Sessiontab == 9) {
        this.cargarFormCaso();
        this.cargarComentarios();
        this.cargarDiagrama();
      }
    });


  }

  onChange($event: any): void {
    console.log("onChange", $event);
  }

  Guardar() {
    const editorsArray = this.richTextEditors.toArray();
    if (editorsArray.length > 0) {
      this.editorContent1 = editorsArray[0].getContent();
    }
    if (editorsArray.length > 1) {
      this.editorContent2 = editorsArray[1].getContent();
    }
    this.caso.form_hipotesis = this.editorContent1;
    this.caso.form_contraste = this.editorContent2;

    if (!this.caso.form_hipotesis) {
      swal.fire('Guardando Datos', `Escriba una descripción en Hipótesis de Origen y mantenimiento!`, 'info');
      return;
    }
    if (!this.caso.form_contraste) {
      swal.fire('Guardando Datos', `Escriba una descripción en Contraste de hipótesis!`, 'info');
      return;
    }
    this.caso.form_paciente_id = this.expediente;
    this._frm.Guardarform(this.caso).subscribe(datos => {

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
    this.caso.form_hipotesis = this.editorContent1;
    this.caso.form_contraste = this.editorContent2;
    this._frm.Updateform(this.caso).subscribe(dp => {

      swal.fire('Actualizando Datos', `Actualización Exitosa!`, 'success');
      this.ngOnInit();

    }, error => {
      console.log(error);
      //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
    });
  }


  cargarFormCaso() {
    this._frm.Getform(this.expediente).subscribe(
      fu => {
        this.caso = fu;
        //console.log(this.evolucion);
        if (this.caso != null) {
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

  public seleccionarDiagrama(event: Event): void {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    const file = files[0];
    console.log(files);
    this.diagrama = file;
    console.info(this.diagrama);
  }

  guardarDiagrama(tipo_prueba: number) {
    this.blockUI.start('Guardando...');
    /*   console.log(this.ponencia_id); */
    if (this.diagrama == null) {
      this.blockUI.stop();
      swal.fire({
        title: 'Info!!!',
        text: 'Seleccione el archivo de su Diagrama',
        icon: 'info',
        timer: 2000
      });

      return;
    }
    console.info(this.diagrama.name);
    console.info(this.diagrama);

    this._env.pruebasAll(this.expediente, tipo_prueba, this.diagrama).subscribe(usr => {

      if (usr) {
        this.blockUI.stop();
        this.resp = usr;
        swal.fire('Archivos subidos', `${this.resp.descripcion}`, 'success');
        this.ngOnInit();
        this.diagrama = null;
        this.myInputDiagrama.nativeElement.value = "";
        //this.resetInput();
      }

    },
      error => {
        console.log(error);
        this.blockUI.stop();
        swal.fire({
          title: 'ERROR!!!',
          text: error.error.message,
          icon: 'error'
        });

      });


  }


  ActualizarDiagrama(tipi_prueba: number) {

    if (this.diagrama == null) {
      this.blockUI.stop();
      swal.fire({
        title: 'Info!!!',
        text: 'No hay archivo para actualizar',
        icon: 'info',
        timer: 2000
      });
      return;
    }




    this.blockUI.start('Actualizando...');
    if (this.diagrama == null) {
      this.blockUI.stop();
      swal.fire({
        title: 'Info!!!',
        text: 'Seleccione el archivo de Diagrama',
        icon: 'info',
        timer: 2000
      });

      return;
    }
    console.info(this.diagrama.name);
    console.info(this.diagrama);

    this._env.UpdatePrueba(this.diagramaFoto.documentId, this.diagrama).subscribe(usr => {

      if (usr) {
        this.blockUI.stop();
        this.resp = usr;
        this.resetFileUploader();
        swal.fire('Archivos subidos', `${this.resp.descripcion}`, 'success');
        //this.resetInput();
        this.diagrama = null;
        this.diagramaFoto = null;
        this.cargarDiagrama();
        /*  */
        this.myInputDiagramaUp.nativeElement.value = "";
        this.ngOnInit();
      }


      /*   this.resetInput(); */
    },
      error => {
        console.log(error);
        this.blockUI.stop();
        swal.fire({
          title: 'ERROR!!!',
          text: error.error.message,
          icon: 'error'
        });

      });

  }

  /*   .then(
      function(){
        window.location.reload();
      }
    ) */
  DeleteDiagrama(tipo_prueba: number) {

    if (this.diagramaFoto == null) {
      swal.fire({
        title: 'Info!!!',
        text: 'No hay archivo para eliminar',
        icon: 'info',
        timer: 2000
      });
      return;
    }

    if (tipo_prueba == 3) {
      this.blockUI.start('Eliminando...');
      this._env.DeletePruebas(tipo_prueba, this.diagramaFoto.documentId).subscribe(usr => {

        if (usr) {
          this.blockUI.stop();
          this.resp = usr;
          swal.fire('Archivo Eliminado', `${this.resp.descripcion}`, 'success');
          this.ngOnInit();
          //this.resetInput();
        }


      },
        error => {
          console.log(error);
          this.blockUI.stop();
          swal.fire({
            title: 'ERROR!!!',
            text: error.error.message,
            icon: 'error'
          });

        });
    } else {
      this.blockUI.start('Eliminando...');
      this._env.DeletePruebas(tipo_prueba, this.diagramaFoto.documentId).subscribe(usr => {

        if (usr) {
          this.resp = usr;
          this.blockUI.stop();
          swal.fire('Archivo Eliminado', `Su archivo se elimino con éxito!`, 'success');
          this.ngOnInit();
          //this.resetInput();
        }
      },
        error => {
          console.log(error);
          this.blockUI.stop();
          swal.fire({
            title: 'ERROR!!!',
            text: error.error.message,
            icon: 'error'
          });

        });
    }

  }

  resetFileUploader() {
    this.myInputDiagramaUp.nativeElement.value = null;
  }
  refresh(): void {
    window.location.reload();
  }
  resetInput() {
    //console.log(this.myInputDiagrama.nativeElement.files);
    this.myInputDiagrama.nativeElement.value = "";

    //console.log(this.myInputDiagramaUp.nativeElement.files);
    this.myInputDiagramaUp.nativeElement.value = "";


  }

  cargarDiagrama() {
    this._env.GetDiagrama(this.expediente).subscribe(
      pac => {
        this.diagramaFoto = pac;
        console.log(this.diagramaFoto);

      }, error => {
        //console.log(error);
        swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }

  VerImagen() {
    const base64ImageData = 'data:image/png;base64,' + this.diagramaFoto.dataFiles;
    const contentType = 'image/png';

    const byteCharacters = atob(base64ImageData.substr(`data:${contentType};base64,`.length));
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
      const slice = byteCharacters.slice(offset, offset + 1024);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }
    const blob = new Blob(byteArrays, { type: contentType });
    const blobUrl = URL.createObjectURL(blob);

    window.open(blobUrl, '_blank');
    /*     let img=new Image();
        img.src=this.diagramaFoto.dataFiles;
        var w = window.open("","_blank");
            w.document.write(img.outerHTML);
       /*  window.open(img,"_blank"); */
  }

  getFileFromBase64() {

  }

}
