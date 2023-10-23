import { Comentarios } from '@/models/Comentarios';
import { LineaVida } from '@/models/LineaVida';
import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ComentariosService } from '@services/comentarios.service';
import { LineaService } from '@services/lineavida.service';
import { SharednumberService } from '@services/sharednumber.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-lineavida',
  templateUrl: './lineavida.component.html',
  styleUrls: ['./lineavida.component.scss']
})
export class LineavidaComponent {
  expediente!: any;
  Sessiontab!: any;
  linea:LineaVida= new LineaVida();
  linealist: LineaVida[];
  Indextab:any;
  com:Comentarios=new Comentarios();
  comentarios: Comentarios[];
  fecCom:any;
  UsuarioId: any;
  UsuarioNombre: any;
  constructor(
    private _pr: LineaService,
    private sharednumber:SharednumberService,
    private datePipe: DatePipe,
    private _com:ComentariosService
  ) { }

  ngOnInit(): void {
    this.expediente=sessionStorage.getItem('Expediente');
    this.Sessiontab=sessionStorage.getItem('IndexTab');
    this.UsuarioId=sessionStorage.getItem('UserId');
    this.UsuarioNombre=sessionStorage.getItem('UserName');
    this.sharednumber.numero$.subscribe(val=>
      {
        this.Indextab=val;
        if(this.Indextab==6||this.Sessiontab==6){
          this.cargarLinea();
          this.cargarComentarios();
        }
      });
  

  }


  GuardarLinea(){
  
    this.linea.lin_paciente_id=this.expediente;
    this._pr.GuardarLinea(this.linea).subscribe(datos => {
      
      if(datos){
        swal.fire('Guardando Datos', `Datos Guardados Exitosamente!`, 'success');
        this.linea.lin_titulo='';
        this.linea.lin_desc='';
      }
      this.ngOnInit();

    },error => {
      console.log(error);
      //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
    });
  }

  getDatosLinea(id:number){
    this._pr.GetLinea(id).subscribe(
      fu => {
      
        this.linea = fu;
       // console.log(this.linea);
      }, error => {
        console.log(error);
        //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }
  

  UpdateDatosLinea(Linea:LineaVida): void {
    this._pr.UpdateLinea(Linea).subscribe(dp => {
      
        swal.fire('Actualizando Datos', `Actualización Exitosa!`, 'success');
        this.linea= new LineaVida();
        this.ngOnInit();
    
    },error => {
      console.log(error);
      //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
    });
  }

  DeleteDatosLinea(id:number): void {
    this._pr.DelLinea(id).subscribe(dp => {
      
        swal.fire('Borrando Registro', `Registro Eliminado!`, 'success');
        this.ngOnInit();
    
    },error => {
      console.log(error);
      //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
    });
  }

  cargarLinea() {
    this._pr.GetLineaList(this.expediente).subscribe(
      fu => {
        this.linealist = fu;
       
        //console.log(this.linealist);
      }, error => {
        console.log(error);
        //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }

  GuardarComentario(){
    console.log(this.expediente);
    console.log(this.com);
    this.com.com_index=this.Sessiontab;
    this.com.com_nombre_usuario=this.UsuarioNombre;
    this.com.com_usuario_id=this.UsuarioId;
    this.com.com_paciente_id=this.expediente;
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
