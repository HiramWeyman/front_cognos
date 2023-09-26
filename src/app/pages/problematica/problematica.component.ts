import { Consulta } from '@/models/Consulta';
import { ProbObj } from '@/models/ProbObj';
import { Component } from '@angular/core';
import { ProblematicaService } from '@services/problematica.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-problematica',
  templateUrl: './problematica.component.html',
  styleUrls: ['./problematica.component.scss']
})
export class ProblematicaComponent {
  consulta: string = '<p>Consulta</p>';
  expediente!: any;
  prob:ProbObj= new ProbObj();
  cons:Consulta= new Consulta();
  problist: ProbObj[];
  habilita:boolean=false;
  constructor(
    private _pr: ProblematicaService,
  ) { }
  ngOnInit(): void {
    this.expediente=sessionStorage.getItem('Expediente');
    this.cargarProb();
    this.cargarConsulta();
  }


  GuardarProb(){
  
    this.prob.pro_paciente_id=this.expediente;
    this._pr.GuardarProbObj(this.prob).subscribe(datos => {
      
      if(datos){
        swal.fire('Guardando Datos', `Datos Guardados Exitosamente!`, 'success');
        this.prob.pro_problema='';
        this.prob.pro_objetivo='';
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
}
