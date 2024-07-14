import { Sesion } from '@/models/Sesion';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RichTextEditorComponent } from '@pages/rich-text-editor/rich-text-editor.component';
/* import { AngularEditorConfig } from '@kolkov/angular-editor'; */
import { AppService } from '@services/app.service';
import { PacientesService } from '@services/pacientes.service';
import { SesionService } from '@services/sesiones.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-editsesion',
  templateUrl: './editsesion.component.html',
  styleUrls: ['./editsesion.component.scss']
})
export class EditsesionComponent implements OnInit {
  idx!: any;
  expediente!: any;
  pac: Sesion = new Sesion();
  terapeutas: any[];
  perfil: any;
  @ViewChildren(RichTextEditorComponent) richTextEditors!: QueryList<RichTextEditorComponent>;
  editorContent1: any;
  editorContent2: any;
  editorContent3: any;
  constructor(private route: ActivatedRoute, private router: Router, private _se: SesionService, private _pac2: PacientesService, private appService: AppService) { }

  ngOnInit(): void {

    this.expediente = localStorage.getItem('Expediente');
    this.perfil = localStorage.getItem('UserPerfil');
    this.idx = this.route.snapshot.paramMap.get('idx');
    this.getDataSesion();
    console.log(this.idx);
    this.cargarTerapeutas();

  }

  cargarTerapeutas() {
    this._pac2.GetTerapeutas().subscribe(
      fu => {
        this.terapeutas = fu;
        console.log(this.terapeutas);

      }, error => {
        console.log(error);
        //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }

  validateFormat(event) {
    let key;
    if (event.type === 'paste') {
      key = event.clipboardData.getData('text/plain');
    } else {
      key = event.keyCode;
      key = String.fromCharCode(key);
    }
    const regex = /[0-9]|\./;
    if (!regex.test(key)) {
      event.returnValue = false;
      if (event.preventDefault) {
        event.preventDefault();
      }
    }
  }

  getDataSesion() {
    this._se.Getsesion(this.idx).subscribe(
      fu => {

        this.pac = fu;
        //console.log(this.trata);
      }, error => {
        console.log(error);
        //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }

  UpdateDatosSesion(sesion: Sesion): void {
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

    this.pac.sesion_evento_act=this.editorContent1;
    this.pac.sesion_pensamientos_cre=this.editorContent2;
    this.pac.sesion_consecuencia_emo=this.editorContent3;
    this._se.UpdateSesion(sesion).subscribe(dp => {

      swal.fire('Actualizando Datos', `Actualización Exitosa!`, 'success');
      this.pac = new Sesion();
      this.router.navigate(['/exp', this.expediente]);

    }, error => {
      console.log(error);
      //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
    });
  }

}
