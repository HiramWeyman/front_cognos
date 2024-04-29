import { Pacientes } from '@/models/Pacientes';
import { EstructuraFam } from '@/models/estructuraFam';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '@services/app.service';
import { FamiliarService } from '@services/familiar.service';
import { PacientesService } from '@services/pacientes.service';
import { SharednumberService } from '@services/sharednumber.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Subscription } from 'rxjs';
import swal from 'sweetalert2';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-generales',
  templateUrl: './generales.component.html',
  styleUrls: ['./generales.component.scss']
})
export class GeneralesComponent implements OnInit{
  @BlockUI()
  blockUI!: NgBlockUI;
  pacIns: Pacientes = new Pacientes();
  pacientes: Pacientes[];
  public ExpedienteId: any = null;
  public Indextab: any = null;
  public Sessiontab: any = null;
  public fnac: any = null;
  public fing: any = null;
  selectedValue: any;
  fec: any;
  tutor: any[];
  terapeutas: any[];
  alumnos: any[];
  perfil:any;
  fam: EstructuraFam = new EstructuraFam();
  cargafam: EstructuraFam = new EstructuraFam();
  llave: string;
  resp:any;
  familiares: any[];
  paterno:string;
  materno:string;
  nombre:string;
  constructor(
    private _pac: PacientesService,
    private _fam: FamiliarService,
    private router: Router,
    private datePipe: DatePipe,
    private sharednumber:SharednumberService,
    private appService: AppService
  ) { }
  ngOnInit(): void {
   
    this.ExpedienteId = localStorage.getItem('Expediente');
    this.Sessiontab=localStorage.getItem('IndexTab');
    this.perfil=localStorage.getItem('UserPerfil');
    this.cargarPacientes();
    this.cargarTutores();
    this.cargarTerapeutas();
    this.cargarAlumnos();
    console.log(sessionStorage.getItem('llaveFam')+'llave');
   
 /*    this.sharednumber.numero$.subscribe(val=>
      {
        this.Indextab=val;
        if(this.Indextab==0||this.Sessiontab==0){
         
        }
      }); */
    
  }



  ActualizarPac() {
    this.blockUI.start('Actualizando Paciente...');
    console.log(this.pacIns);
    if(this.pacIns.pac_terapeuta==0){
      this.pacIns.pac_terapeuta==null;
    }
    if(this.pacIns.pac_coterapeuta==0){
      this.pacIns.pac_coterapeuta==null;
    }
    if(!this.pacIns.pac_genero){
      this.blockUI.stop();
      swal.fire({
        title: 'Información!!!',
        text: 'Falta Ingresar Género',
        icon: 'info'
      });
      return;
    }
    if(!this.pacIns.pac_edocivil){
      this.blockUI.stop();
      swal.fire({
        title: 'Información!!!',
        text: 'Falta Ingresar Estado Civil',
        icon: 'info'
      });
      return;
    }
    if(!this.pacIns.pac_escolaridad){
      this.blockUI.stop();
      swal.fire({
        title: 'Información!!!',
        text: 'Falta Ingresar Escolaridad',
        icon: 'info'
      });
      return;
    }

    if(this.familiares == null || this.familiares == undefined){
      this.blockUI.stop();
      swal.fire({
        title: 'Información!!!',
        text: 'Debe Ingresar al menos un familiar',
        icon: 'info'
      });
      return; 
     }

    if(this.familiares.length == 0){
      this.blockUI.stop();
      swal.fire({
        title: 'Información!!!',
        text: 'Debe Ingresar al menos un familiar',
        icon: 'info'
      });
      return;
    }
    this.pacIns.pac_llave_fam=String(sessionStorage.getItem('llaveFam'));
/*     this.pac.pac_paterno=this.paterno;
    this.pac.pac_materno=this.materno;
    this.pac.pac_materno=this.nombre; */
    console.log(this.pacIns);
    this._pac.UpdatePacientes(this.pacIns)
        .subscribe((data: any) => {
          this.blockUI.stop();
          swal.fire({
            icon: 'success',
            title: 'Paciente Actualizado',
            text: 'Actualización Exitosa ',
            timer: 2000
        });
         sessionStorage.removeItem('llaveFam');
         this.router.navigate(['/exp/'+this.ExpedienteId]); 
         this.cargarPacientes();
     /*    this.ngOnInit(); */
        },
        error => {
          this.blockUI.stop();
            //console.log(error.error.Message);
            swal.fire({
                title: 'ERROR!!!',
                text: error.error.Message,
                icon: 'error'});
        });
    }

  cargarPacientes() {
    this._pac.GetPaciente(this.ExpedienteId).subscribe(
      pac => {
        this.pacIns = pac;
        console.log('Paciente Generales');
        console.log(this.pacIns);
       /*  this.paterno=this.pac.pac_paterno;
        this.materno=this.pac.pac_materno;
        this.nombre=this.pac.pac_materno; */

        if(this.pacIns.pac_terapeuta==null){
          this.pacIns.pac_terapeuta==0;
        }
        if(this.pacIns.pac_coterapeuta==null){
          this.pacIns.pac_coterapeuta==0;
        }
        console.log(this.pacIns.pac_llave_fam);
        if(this.pacIns.pac_llave_fam=="null"){
          var num = Math.floor(Math.random() * 90000) + 10000;
          //console.log(num);
          this.llave = String(num);
          //console.log(this.llave);
          sessionStorage.setItem('llaveFam', this.llave);
          console.log(sessionStorage.getItem('llaveFam'));
          this.pacIns.pac_llave_fam=String(sessionStorage.getItem('llaveFam'));
          console.log(this.pacIns.pac_llave_fam);
        }
        if(this.pacIns.pac_llave_fam!=null){
          //alert('Verdadero');
          sessionStorage.setItem('llaveFam', this.pacIns.pac_llave_fam);
          //console.log(sessionStorage.getItem('llaveFam'));
          this.cargarFamiliares();
        }
        else{
          //alert('Falso');
          console.log(sessionStorage.getItem('llaveFam'));
          if(sessionStorage['llaveFam']){
            this.cargarFamiliares();
            return;
          }
        /*   if (sessionStorage.getItem('llaveFam').length>0) {
           
         } */
       /*   if (!sessionStorage.getItem('llaveFam')==null) {
             this.cargarFamiliares();
             return;
          } */
          else {
            console.log('Entra');
           var num = Math.floor(Math.random() * 90000) + 10000;
            //console.log(num);
            this.llave = String(num);
            //console.log(this.llave);
            sessionStorage.setItem('llaveFam', this.llave);
            console.log(sessionStorage.getItem('llaveFam'));
            this.pacIns.pac_llave_fam=String(sessionStorage.getItem('llaveFam'));
            console.log(this.pacIns.pac_llave_fam);
          } 

        }
  
      }, error => {
        //console.log(error);
        swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }

  cargarTutores() {
    this._pac.GetTutores().subscribe(
      fu => {
        this.tutor = fu;
        //console.log(this.tutor);
        
      }, error => {
        console.log(error);
        //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }

  cargarTerapeutas() {
    this._pac.GetTerapeutas().subscribe(
      fu => {
        this.terapeutas = fu;
       // console.log(this.terapeutas);
      
      }, error => {
        console.log(error);
        //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }

  cargarAlumnos() {
    this._pac.GetAlumnosR1R2().subscribe(
      fu => {
        this.alumnos = fu;
        console.log('Carga Alumnos');
        //console.log(this.alumnos);
      
      }, error => {
        console.log(error);
        //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }


  GuardarFam() {
    if (!this.fam) {
      this.blockUI.stop();
      swal.fire({
        title: 'Información!!!',
        text: 'Falta Ingresar un Familiar',
        icon: 'info'
      });
      return;
    }
    else {
      this.blockUI.start('Guardando Familiar...');
      this.fam.fam_llave_pac = String(sessionStorage.getItem('llaveFam'));
      this._fam.GuardarFamiliar(this.fam).subscribe(res => {
        if (res) {
          this.resp=res;
          console.log(res);
          this.blockUI.stop();
          Swal.fire('Guardando Datos', `${this.resp.descripcion}`, 'success');
          this.cargarFamiliares();
          this.fam.fam_nombre = '';
          this.fam.fam_edad = '';
          this.fam.fam_parentesco = '';
          this.fam.fam_ocupacion = '';
          this.fam.fam_dependientes = '';
        }
      }, error => {
        this.blockUI.stop();
        console.log(error);
        //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
    }
  }

  cargarFamiliares() {
    console.log(String(sessionStorage.getItem('llaveFam')));
    this._fam.GetFamiliarList(String(sessionStorage.getItem('llaveFam'))).subscribe(
      fu => {
        this.familiares = fu;
        console.log(this.familiares);

      }, error => {
        console.log(error);
        //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }


  limpiar() {
    this.fam.fam_nombre = '';
    this.fam.fam_edad = '';
    this.fam.fam_parentesco = '';
    this.fam.fam_ocupacion = '';
    this.fam.fam_dependientes = '';
  }

  CargaFamiliar(id: number){
    this._fam.GetFamiliar(id).subscribe(fam=>{
      this.cargafam=fam;
      console.log(this.cargafam);
    });
  }
/*   'Familiar eliminado correctamente' */
  Actualizar() {
    this.blockUI.start('Actualizando Familiar...');
    this._fam.UpdateFamiliar(this.cargafam).subscribe(usr => {
      this.blockUI.stop();
      if(usr){
        this.resp=usr;

        Swal.fire('Actualizando Datos',`${this.resp.descripcion}` , 'success');
        this.cargarFamiliares();
      } 
    }, error => {
      this.blockUI.stop();
      console.log(error);
      //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
    });
  }

  Borrar(id: number) {
    this.blockUI.start('Eliminando Familiar...');
    this._fam.DelFamiliar(id).subscribe(usr => {
      this.blockUI.stop();
      if(usr){
        this.resp=usr;
        Swal.fire('Eliminando Datos', `${this.resp.descripcion}`, 'success');
        this.cargarFamiliares();
      } 
    }, error => {
      this.blockUI.stop();
      console.log(error);
      //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
    });
  }
}
