import { Pacientes } from '@/models/Pacientes';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { PacientesService } from '@services/pacientes.service';
import { Subscription } from 'rxjs';
import swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { SesionService } from '@services/sesiones.service';
import { Sesion } from '@/models/Sesion';
import { AppService } from '@services/app.service';
import { RichTextEditorComponent } from '@pages/rich-text-editor/rich-text-editor.component';
/* import { AngularEditorConfig } from '@kolkov/angular-editor'; */
@Component({
  selector: 'app-regsesion',
  templateUrl: './regsesion.component.html',
  styleUrls: ['./regsesion.component.scss']
})
export class RegsesionComponent {
@ViewChildren(RichTextEditorComponent) richTextEditors!: QueryList<RichTextEditorComponent>;
editorContent1: any;
editorContent2: any;
editorContent3: any;
pac:Sesion=new Sesion();
private subscription: Subscription;
public userId: any = null;
public fnac: any = null;
public fing: any = null;
expediente!: any;
terapeutas: any[];

perfil:any;
constructor(
  private _pac: SesionService,
  private router: Router,
  private datePipe: DatePipe,
  private _pac2: PacientesService,
  private appService: AppService
) {}

  ngOnInit(): void {
   
    this.expediente=localStorage.getItem('Expediente');
    this.perfil=localStorage.getItem('UserPerfil');
    console.log(this.expediente);
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

  GuardarSesion(){
  
    this.pac.sesion_paciente_id=this.expediente;
    this.pac.sesion_caso=this.expediente;
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
    console.log(this.pac);
    this._pac.GuardarSesion(this.pac).subscribe(datos => {
      
      if(datos){
        swal.fire('Guardando Datos', `Datos Guardados Exitosamente!`, 'success');
        this.pac=new Sesion();
        this.router.navigate(['/exp',this.expediente]);
      }
   

    },error => {
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
}
