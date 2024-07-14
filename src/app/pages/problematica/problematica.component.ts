import { Comentarios } from '@/models/Comentarios';
import { Consulta } from '@/models/Consulta';
import { ProbObj } from '@/models/ProbObj';
import { DatePipe } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RichTextEditorComponent } from '@pages/rich-text-editor/rich-text-editor.component';
import { AppService } from '@services/app.service';
import { ComentariosService } from '@services/comentarios.service';
import { ProblematicaService } from '@services/problematica.service';
import { SharednumberService } from '@services/sharednumber.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-problematica',
  templateUrl: './problematica.component.html',
  styleUrls: ['./problematica.component.scss']
})
export class ProblematicaComponent {
  @ViewChild(RichTextEditorComponent) richTextEditor!: RichTextEditorComponent;

  consulta: string = '<p>Consulta</p>';
  expediente!: any;
  Sessiontab!: any;
  prob:ProbObj= new ProbObj();
  cons:Consulta= new Consulta();
  problist: ProbObj[];
  habilita:boolean=false;
  Indextab: any ;
  com:Comentarios=new Comentarios();
  comentarios: Comentarios[];
  fecCom:any;
  UsuarioId: any;
  UsuarioNombre: any;

  constructor(
    private _pr: ProblematicaService,
    private sharednumber:SharednumberService,
    private datePipe: DatePipe,
    private _com:ComentariosService,
    private appService: AppService,
    private router: Router
  ) { }
 
  ngOnInit(): void {
 
    this.expediente=localStorage.getItem('Expediente');
    this.Sessiontab=localStorage.getItem('IndexTab');
    this.UsuarioId=localStorage.getItem('UserId');
    this.UsuarioNombre=localStorage.getItem('UserName');
    this.sharednumber.numero$.subscribe(val=>
      {
        this.Indextab=val;
        if(this.Indextab==3||this.Sessiontab==3){
          this.cargarProb();
          this.cargarConsulta();
          console.log();
          this.cargarComentarios();
        }
      });

  
  }


  GuardarProb(){
  
    this.prob.pro_paciente_id=this.expediente;
    const contenidoEditor = this.richTextEditor.getContent();
    this.cons.con_motivo=contenidoEditor;
   /*  if(!this.cons.con_motivo){
      swal.fire({ title: 'info!!!', text: 'Requiere motivo de consulta', icon: 'info' });
      return;
    } */
    this._pr.GuardarProbObj(this.prob).subscribe(datos => {
      
      if(datos){
        swal.fire('Guardando Datos', `Datos Guardados Exitosamente!`, 'success');
        this.prob.pro_problema='';
        this.prob.pro_objetivo='';
        this.prob.pro_tecnica='';
      }
      this.ngOnInit();

    },error => {
      console.log(error);
      //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
    });
  }

  getDatosProb(id:number){
    this._pr.GetProbObj(id).subscribe(
      fu => {
      
        this.prob = fu;
        //console.log(this.prob);
      }, error => {
        console.log(error);
        //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }
  

  UpdateDatosProb(Prob:ProbObj): void {
    const contenidoEditor = this.richTextEditor.getContent();
    this.cons.con_motivo=contenidoEditor;
    this._pr.UpdateProbObj(Prob).subscribe(dp => {
      
        swal.fire('Actualizando Datos', `Actualización Exitosa!`, 'success');
        this.prob= new ProbObj();
        this.ngOnInit();
    
    },error => {
      console.log(error);
      //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
    });
  }

  DeleteDatosProb(id:number): void {
    this._pr.DelProbObj(id).subscribe(dp => {
      
        swal.fire('Borrando Registro', `Registro Eliminado!`, 'success');
        this.ngOnInit();
    
    },error => {
      console.log(error);
      //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
    });
  }

  cargarProb() {
    this._pr.GetProbList(this.expediente).subscribe(
      fu => {
        this.problist = fu;
       
        //console.log(this.problist);
      }, error => {
        console.log(error);
        //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }

  /////////////////////////////////Consulta////////////////////////
  Guardar(){
  
   this.cons.con_paciente_id=this.expediente;
    this._pr.GuardarConsulta(this.cons).subscribe(datos => {
      
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
    console.log(this.cons);
    this._pr.UpdateConsulta(this.cons).subscribe(dp => {
      
        swal.fire('Actualizando Datos', `Actualización Exitosa!`, 'success');
        this.ngOnInit();
    
    },error => {
      console.log(error);
      //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
    });
  }


  cargarConsulta() {
    this._pr.GetConsulta(this.expediente).subscribe(
      fu => {
        this.cons = fu;
        //console.log(this.cons);
        if(this.cons!=null){
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
