import { Consumo } from '@/models/Consumo';
import { Previo } from '@/models/Previo';
import { ProbMed } from '@/models/ProbMed';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AntecedentesService } from '@services/antecedentes.service';
import swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { SharednumberService } from '@services/sharednumber.service';
import { ComentariosService } from '@services/comentarios.service';
import { Comentarios } from '@/models/Comentarios';
import { AppService } from '@services/app.service';

@Component({
  selector: 'app-antecedentes',
  templateUrl: './antecedentes.component.html',
  styleUrls: ['./antecedentes.component.scss']
})
export class AntecedentesComponent {
  expediente!: any;
  Sessiontab!: any;
  probmed:ProbMed= new ProbMed();
  probmedlist: ProbMed[];
  Indextab: any ;
  
  prev:Previo= new Previo();
  prevlist: Previo[];

  cons:Consumo= new Consumo();
  conslist: Consumo[];

  fec:any;
  fecUp:any;
  com:Comentarios=new Comentarios();
  comentarios: Comentarios[];
  fecCom:any;
  UsuarioId: any;
  UsuarioNombre: any;
  constructor(
    private _ant: AntecedentesService,
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
        if(this.Indextab==2||this.Sessiontab==2){
          this.cargarProb();
          this.cargarPrev();
          this.cargarCons();
          this.cargarComentarios()
        }
      });

  }

  GuardarProb(){
  
    this.probmed.problema_paciente_id=this.expediente;
    this._ant.GuardarProbMed(this.probmed).subscribe(datos => {
      
      if(datos){
        swal.fire('Guardando Datos', `Datos Guardados Exitosamente!`, 'success');
        this.probmed.problema_problema='';
        this.probmed.problema_medico='';
        this.probmed.problema_medicamento='';
        this.probmed.problema_fecha_ini_trata=null;
        this.probmed.problema_tiempo_tratamiento='';
      }
      this.ngOnInit();

    },error => {
      console.log(error);
      //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
    });
  }

  getDatosProb(id:number){
    this._ant.GetProbMed(id).subscribe(
      fu => {
      
        this.probmed = fu;
        this.fecUp =this.datePipe.transform(this.probmed.problema_fecha_ini_trata,"yyyy-MM-dd");
        this.probmed.problema_fecha_ini_trata= this.fecUp;
        //console.log(this.probmed);
      }, error => {
        console.log(error);
        //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }
  

  UpdateDatosProb(prob:ProbMed): void {
    this._ant.UpdateProbMed(prob).subscribe(dp => {
      
        swal.fire('Actualizando Datos', `Actualización Exitosa!`, 'success');
        this.probmed= new ProbMed();
        this.ngOnInit();
    
    },error => {
      console.log(error);
      //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
    });
  }

  DeleteDatosProb(id:number): void {
    this._ant.DelProbMed(id).subscribe(dp => {
      
        swal.fire('Borrando Registro', `Registro Eliminado!`, 'success');
        this.ngOnInit();
    
    },error => {
      console.log(error);
      //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
    });
  }

  cargarProb() {
    this._ant.GetProbMedList(this.expediente).subscribe(
      fu => {
        this.probmedlist = fu;
        for(let i=0;i<this.probmedlist.length;i++){
          this.fec =this.datePipe.transform(this.probmedlist[i].problema_fecha_ini_trata,"dd/MM/yyyy");
          this.probmedlist[i].problema_fecha_ini_trata= this.fec;
        }
        //console.log(this.probmedlist);
      }, error => {
        console.log(error);
        //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }

  ////previo////
  GuardarPrev(){
  
    this.prev.previo_paciente_id=this.expediente;
    this._ant.GuardarPrevio(this.prev).subscribe(datos => {
      
      if(datos){
        swal.fire('Guardando Datos', `Datos Guardados Exitosamente!`, 'success');
        this.prev.previo_problema='';
        this.prev.previo_medico='';
        this.prev.previo_medicamento='';
        this.prev.previo_tiempo_tratamiento=null;
        this.prev.previo_tiempo_psicologico='';
      }
      this.ngOnInit();

    },error => {
      console.log(error);
      //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
    });
  }

  getDatosPrev(id:number){
    this._ant.GetPrevio(id).subscribe(
      fu => {
      
        this.prev = fu;
        //console.log(this.prev);
      }, error => {
        console.log(error);
        //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }
  

  UpdateDatosPrev(prob:Previo): void {
    this._ant.UpdatePrevio(prob).subscribe(dp => {
      
        swal.fire('Actualizando Datos', `Actualización Exitosa!`, 'success');
        this.prev= new Previo();
        this.ngOnInit();
    
    },error => {
      console.log(error);
      //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
    });
  }

  DeleteDatosPrev(id:number): void {
    this._ant.DelPrevio(id).subscribe(dp => {
      
        swal.fire('Borrando Registro', `Registro Eliminado!`, 'success');
        this.ngOnInit();
    
    },error => {
      console.log(error);
      //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
    });
  }

  cargarPrev() {
    this._ant.GetPrevioList(this.expediente).subscribe(
      fu => {
        this.prevlist = fu;
        //console.log(this.prevlist);
      }, error => {
        console.log(error);
        //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }
  ///consumo////
  GuardarCons(){
  
    this.cons.consumo_paciente_id=this.expediente;
    this._ant.GuardarConsumo(this.cons).subscribe(datos => {
      
      if(datos){
        swal.fire('Guardando Datos', `Datos Guardados Exitosamente!`, 'success');
        this.cons.consumo_sustancia='';
        this.cons.consumo_sino='';
        this.cons.consumo_edad_inicio='';
        this.cons.consumo_cantidad=null;
        this.cons.consumo_tiempo='';
      }
      this.ngOnInit();

    },error => {
      console.log(error);
      //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
    });
  }

  getDatosCons(id:number){
    this._ant.GetConsumo(id).subscribe(
      fu => {
      
        this.cons = fu;
        //console.log(this.cons);
      }, error => {
        console.log(error);
        //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }
  

  UpdateDatosCons(prob:Consumo): void {
    this._ant.UpdateConsumo(prob).subscribe(dp => {
      
        swal.fire('Actualizando Datos', `Actualización Exitosa!`, 'success');
        this.cons= new Consumo();
        this.ngOnInit();
    
    },error => {
      console.log(error);
      //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
    });
  }

  DeleteDatosCons(id:number): void {
    this._ant.DelConsumo(id).subscribe(dp => {
      
        swal.fire('Borrando Registro', `Registro Eliminado!`, 'success');
        this.ngOnInit();
    
    },error => {
      console.log(error);
      //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
    });
  }

  cargarCons() {
    this._ant.GetConsumoList(this.expediente).subscribe(
      fu => {
        this.conslist = fu;
        //console.log(this.conslist);
      }, error => {
        console.log(error);
        //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }
  /////
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
