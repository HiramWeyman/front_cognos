import { Pacientes } from '@/models/Pacientes';
import { EstructuraFam } from '@/models/estructuraFam';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PacientesService } from '@services/pacientes.service';
import { Subscription } from 'rxjs';
import swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { FamiliarService } from '@services/familiar.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-regpaciente',
  templateUrl: './regpaciente.component.html',
  styleUrls: ['./regpaciente.component.scss']
})
export class RegpacienteComponent implements OnInit {
  @BlockUI()
  blockUI!: NgBlockUI;
  pac: Pacientes = new Pacientes();
  fam: EstructuraFam = new EstructuraFam();
  cargafam: EstructuraFam = new EstructuraFam();
  private subscription: Subscription;
  public userId: any = null;
  public fnac: any = null;
  public fing: any = null;
  tutor: any[];
  alumnos: any[];
  terapeutas: any[];
  familiares: any[];
  perfil: any;
  llave: string;
  resp:any;

  constructor(
    private _pac: PacientesService,
    private _fam: FamiliarService,
    private router: Router,
    private datePipe: DatePipe

  ) { }
  ngOnInit(): void {
    this.userId = sessionStorage.getItem('UserId');
    this.perfil = sessionStorage.getItem('UserPerfil');
    this.cargarTutores();
    this.tutor = [0];
    this.cargarTerapeutas();
    this.terapeutas = [0];
    this.cargarAlumnos();
    this.cargarFamiliares();
    console.log(localStorage.getItem('llaveFam'));
    if (localStorage.getItem('llaveFam') == 'undefined' || localStorage.getItem('llaveFam') == null) {
      var num = Math.floor(Math.random() * 90000) + 10000;
      //console.log(num);
      this.llave = String(num);
      //console.log(this.llave);
      localStorage.setItem('llaveFam', this.llave);
      console.log(localStorage.getItem('llaveFam'));
    }
    else {
      return;
    }



  }
  /* RegistrarPac(){
    console.log(this.pac);
  } */

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

  cargarAlumnos() {
    this._pac.GetAlumnosR1R2().subscribe(
      fu => {
        this.alumnos = fu;
       // console.log('Carga Alumnos');
        //console.log(this.alumnos);

      }, error => {
        console.log(error);
        //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }



  cargarTerapeutas() {
    this._pac.GetTerapeutas().subscribe(
      fu => {
        this.terapeutas = fu;
        //console.log(this.terapeutas);

      }, error => {
        console.log(error);
        //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }


  cargarFamiliares() {
    this._fam.GetFamiliarList(String(localStorage.getItem('llaveFam'))).subscribe(
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
      this.fam.fam_llave_pac = String(localStorage.getItem('llaveFam'));
      this._fam.GuardarFamiliar(this.fam).subscribe(res => {
        if (res) {
          this.resp=res;
         // console.log(res);
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

  CargaFamiliar(id: number){
    this._fam.GetFamiliar(id).subscribe(fam=>{
      this.cargafam=fam;
      //console.log(this.cargafam);
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

  RegistrarPac() {
    this.blockUI.start('Guardando...');

    if (!this.pac.pac_paterno) {
      this.blockUI.stop();
      swal.fire({
        title: 'Información!!!',
        text: 'Falta Ingresar Apellido Paterno',
        icon: 'info'
      });
      return;
    }

    if (!this.pac.pac_materno) {
      this.blockUI.stop();
      swal.fire({
        title: 'Información!!!',
        text: 'Falta Ingresar Apellido Materno',
        icon: 'info'
      });
      return;
    }

    if (!this.pac.pac_nombre) {
      this.blockUI.stop();
      swal.fire({
        title: 'Información!!!',
        text: 'Falta Ingresar Nombre',
        icon: 'info'
      });
      return;
    }

    if (!this.pac.pac_fecha_nacimiento) {
      this.blockUI.stop();
      swal.fire({
        title: 'Información!!!',
        text: 'Falta Ingresar Fecha de Nacimiento',
        icon: 'info'
      });
      return;
    }

    if (!this.pac.pac_fecha_ingreso) {
      this.blockUI.stop();
      swal.fire({
        title: 'Información!!!',
        text: 'Falta Ingresar Fecha de Ingreso',
        icon: 'info'
      });
      return;
    }

    if (!this.pac.pac_edad) {
      this.blockUI.stop();
      swal.fire({
        title: 'Información!!!',
        text: 'Falta Ingresar Edad',
        icon: 'info'
      });
      return;
    }

    if (!this.pac.pac_genero) {
      this.blockUI.stop();
      swal.fire({
        title: 'Información!!!',
        text: 'Falta Ingresar Género',
        icon: 'info'
      });
      return;
    }
    if (!this.pac.pac_escolaridad) {
      this.blockUI.stop();
      swal.fire({
        title: 'Información!!!',
        text: 'Falta Ingresar Escolaridad',
        icon: 'info'
      });
      return;
    }

    if (!this.pac.pac_ocupacion) {
      this.blockUI.stop();
      swal.fire({
        title: 'Información!!!',
        text: 'Falta Ingresar Ocupación',
        icon: 'info'
      });
      return;
    }

    if (!this.pac.pac_email) {
      this.blockUI.stop();
      swal.fire({
        title: 'Información!!!',
        text: 'Falta Ingresar Email',
        icon: 'info'
      });
      return;
    }

    if (!this.pac.pac_domicilio) {
      this.blockUI.stop();
      swal.fire({
        title: 'Información!!!',
        text: 'Falta Ingresar Domicilio',
        icon: 'info'
      });
      return;
    }

    if (!this.pac.pac_orientacion) {
      this.blockUI.stop();
      swal.fire({
        title: 'Información!!!',
        text: 'Falta Ingresar Orientación Sexual',
        icon: 'info'
      });
      return;
    }

    if (!this.pac.pac_edocivil) {
      this.blockUI.stop();
      swal.fire({
        title: 'Información!!!',
        text: 'Falta Ingresar Estado Civil',
        icon: 'info'
      });
      return;
    }

    if (!this.pac.pac_pareja) {
      this.blockUI.stop();
      swal.fire({
        title: 'Información!!!',
        text: 'Falta Ingresar Si tiene pareja',
        icon: 'info'
      });
      return;
    }

    if (!this.pac.pac_religion) {
      this.blockUI.stop();
      swal.fire({
        title: 'Información!!!',
        text: 'Falta Ingresar Religión',
        icon: 'info'
      });
      return;
    }

    if (!this.pac.pac_trabaja) {
      this.blockUI.stop();
      swal.fire({
        title: 'Información!!!',
        text: 'Falta Ingresar si trabaja',
        icon: 'info'
      });
      return;
    }

    if (this.familiares.length == 0) {
      this.blockUI.stop();
      swal.fire({
        title: 'Información!!!',
        text: 'Agregue al menos un familiar',
        icon: 'info'
      });
      return;
    }

    if (!this.pac.pac_telefono) {
      this.blockUI.stop();
      swal.fire({
        title: 'Información!!!',
        text: 'Falta Ingresar Teléfono de Contacto',
        icon: 'info'
      });
      return;
    }

    if (!this.pac.pac_contacto_eme) {
      this.blockUI.stop();
      swal.fire({
        title: 'Información!!!',
        text: 'Falta Ingresar Contacto de Emergencia',
        icon: 'info'
      });
      return;
    }

    if (!this.pac.pac_telefono_eme) {
      this.blockUI.stop();
      swal.fire({
        title: 'Información!!!',
        text: 'Falta Ingresar Teléfono en Caso de Emergencia',
        icon: 'info'
      });
      return;
    }

    if (!this.pac.pac_vive_con) {
      this.blockUI.stop();
      swal.fire({
        title: 'Información!!!',
        text: 'Falta Ingresar con quien vive',
        icon: 'info'
      });
      return;
    }

    if (!this.pac.pac_idea_su) {
      this.blockUI.stop();
      swal.fire({
        title: 'Información!!!',
        text: 'Falta Ingresar Ideación suicida',
        icon: 'info'
      });
      return;
    }

    if (!this.pac.pac_intento_su) {
      this.blockUI.stop();
      swal.fire({
        title: 'Información!!!',
        text: 'Falta Ingresar Intento suicida',
        icon: 'info'
      });
      return;
    }

    if (!this.pac.pac_plan_su) {
      this.blockUI.stop();
      swal.fire({
        title: 'Información!!!',
        text: 'Falta Ingresar Plan suicida',
        icon: 'info'
      });
      return;
    }

    if (!this.pac.pac_autolesion) {
      this.blockUI.stop();
      swal.fire({
        title: 'Información!!!',
        text: 'Falta Ingresar Autolesión',
        icon: 'info'
      });
      return;
    }






    this.pac.pac_usr_id = this.userId;
   // console.log(this.pac);
   // console.log(this.datePipe.transform(this.pac.pac_fecha_ingreso, "yyyy-MM-dd"));
   // console.log(this.datePipe.transform(this.pac.pac_fecha_nacimiento, "yyyy-MM-dd"));
    this.fnac = this.datePipe.transform(this.pac.pac_fecha_nacimiento, "yyyy-MM-dd");
    this.fing = this.datePipe.transform(this.pac.pac_fecha_ingreso, "yyyy-MM-dd");
    this.pac.pac_fecha_ingreso = this.fing;
    this.pac.pac_fecha_nacimiento = this.fnac;
    this.pac.pac_llave_fam = String(localStorage.getItem('llaveFam'));
    console.log(this.pac);
    this.subscription = this._pac.RegistroPacientes(this.pac)
      .subscribe((data: any) => {
        if (data != null) {
          this.blockUI.stop();
          console.log(data);
          swal.fire({
            icon: 'success',
            title: 'Paciente Registrado',
            text: 'Registro Exitoso ',
            timer: 2000
          });
          localStorage.removeItem('llaveFam');
          this.router.navigate(['/pacientes']);

        } else {
          this.blockUI.stop();
          swal.fire({
            icon: 'error',
            title: 'Ocurrio un error en el registro'
          });
        }
      },
        error => {
          this.blockUI.stop();
          //console.log(error.error.Message);
          swal.fire({
            title: 'ERROR!!!',
            text: error.error.Message,
            icon: 'error'
          });
        });
  }




}
