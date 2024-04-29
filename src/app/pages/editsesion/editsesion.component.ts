import { Sesion } from '@/models/Sesion';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  pac:Sesion=new Sesion();
  terapeutas: any[];
  ckeConfig:any;
  perfil:any;
  constructor(private route: ActivatedRoute, private router: Router,private _se:SesionService, private _pac2: PacientesService,private appService: AppService) {
   
  }
  ngOnInit(): void {
  
    this.expediente=localStorage.getItem('Expediente');
    this.perfil=localStorage.getItem('UserPerfil');
    this.idx = this.route.snapshot.paramMap.get('idx');
    this.getDataSesion();
    console.log(this.idx);
    this.cargarTerapeutas();
    this.ckeConfig = {
      allowedContent: false,
      forcePasteAsPlainText: true,
      font_names: 'Arial;Times New Roman;Verdana',
      toolbarGroups: [
        { name: 'document', groups: ['mode', 'document', 'doctools'] },
        { name: 'clipboard', groups: ['clipboard', 'undo'] },
        { name: 'editing', groups: ['find', 'selection', 'spellchecker', 'editing'] },
        { name: 'forms', groups: ['forms'] },
        '/',
        { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
        { name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi', 'paragraph'] },
        { name: 'links', groups: ['links'] },
        { name: 'insert', groups: ['insert'] },
        '/',
        { name: 'styles', groups: ['styles'] },
        { name: 'colors', groups: ['colors'] },
        { name: 'tools', groups: ['tools'] },
        { name: 'others', groups: ['others'] },
        { name: 'about', groups: ['about'] }
      ],
      removeButtons: 'Source,Save,NewPage,Preview,Print,Templates,Cut,Copy,Paste,PasteText,PasteFromWord,Undo,Redo,Find,Replace,SelectAll,Scayt,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,Strike,Subscript,Superscript,CopyFormatting,RemoveFormat,Outdent,Indent,CreateDiv,Blockquote,BidiLtr,BidiRtl,Language,Unlink,Anchor,Image,Flash,Table,HorizontalRule,Smiley,SpecialChar,PageBreak,Iframe,Maximize,ShowBlocks,About'
    };
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

    getDataSesion(){
      this._se.Getsesion(this.idx).subscribe(
        fu => {
        
          this.pac = fu;
          //console.log(this.trata);
        }, error => {
          console.log(error);
          //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
        });
    }

    UpdateDatosSesion(sesion:Sesion): void {
      this._se.UpdateSesion(sesion).subscribe(dp => {
        
          swal.fire('Actualizando Datos', `Actualización Exitosa!`, 'success');
          this.pac=new Sesion();
          this.router.navigate(['/exp',this.expediente]);
      
      },error => {
        console.log(error);
        //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
    }
 
}
