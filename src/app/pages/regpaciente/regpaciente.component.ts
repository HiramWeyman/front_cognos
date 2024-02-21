import { Pacientes } from '@/models/Pacientes';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PacientesService } from '@services/pacientes.service';
import { Subscription } from 'rxjs';
import swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-regpaciente',
  templateUrl: './regpaciente.component.html',
  styleUrls: ['./regpaciente.component.scss']
})
export class RegpacienteComponent implements OnInit{
@BlockUI()
blockUI!: NgBlockUI;
pac:Pacientes=new Pacientes();
private subscription: Subscription;
public userId: any = null;
public fnac: any = null;
public fing: any = null;
tutor: any[];
alumnos: any[];
terapeutas:any[];
perfil:any;
constructor(
  private _pac: PacientesService,
  private router: Router,
  private datePipe: DatePipe
  
) {}
  ngOnInit(): void {
    this.userId = sessionStorage.getItem('UserId');
    this.perfil=sessionStorage.getItem('UserPerfil');
    this.cargarTutores();
    this.tutor=[0];
    this.cargarTerapeutas();
    this.terapeutas=[0];
    this.cargarAlumnos();
  }
/* RegistrarPac(){
  console.log(this.pac);
} */

cargarTutores() {
  this._pac.GetTutores().subscribe(
    fu => {
      this.tutor = fu;
      console.log(this.tutor);
    
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
      console.log(this.alumnos);
    
    }, error => {
      console.log(error);
      //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
    });
}



cargarTerapeutas() {
  this._pac.GetTerapeutas().subscribe(
    fu => {
      this.terapeutas = fu;
      console.log(this.terapeutas);
    
    }, error => {
      console.log(error);
      //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
    });
}

RegistrarPac() {
  this.blockUI.start('Guardando...');

  if(!this.pac.pac_paterno){
    this.blockUI.stop();
    swal.fire({
      title: 'ERROR!!!',
      text: 'Falta Ingresar Apellido Paterno',
      icon: 'info'});
      return;
  }

  if(!this.pac.pac_materno){
    this.blockUI.stop();
    swal.fire({
      title: 'ERROR!!!',
      text: 'Falta Ingresar Apellido Materno',
      icon: 'info'});
      return;
  }

  if(!this.pac.pac_nombre){
    this.blockUI.stop();
    swal.fire({
      title: 'ERROR!!!',
      text: 'Falta Ingresar Nombre',
      icon: 'info'});
      return;
  }

  if(!this.pac.pac_fecha_nacimiento){
    this.blockUI.stop();
    swal.fire({
      title: 'ERROR!!!',
      text: 'Falta Ingresar Fecha de Nacimiento',
      icon: 'info'});
      return;
  }

  if(!this.pac.pac_fecha_ingreso){
    this.blockUI.stop();
    swal.fire({
      title: 'ERROR!!!',
      text: 'Falta Ingresar Fecha de Ingreso',
      icon: 'info'});
      return;
  }

  if(!this.pac.pac_edad){
    this.blockUI.stop();
    swal.fire({
      title: 'ERROR!!!',
      text: 'Falta Ingresar Edad',
      icon: 'info'});
      return;
  }

  if(!this.pac.pac_genero){
    this.blockUI.stop();
    swal.fire({
      title: 'ERROR!!!',
      text: 'Falta Ingresar Género',
      icon: 'info'});
      return;
  }
  if(!this.pac.pac_genero){
    this.blockUI.stop();
    swal.fire({
      title: 'ERROR!!!',
      text: 'Falta Ingresar Género',
      icon: 'info'});
      return;
  }

  if(!this.pac.pac_edocivil){
    this.blockUI.stop();
    swal.fire({
      title: 'ERROR!!!',
      text: 'Falta Ingresar Estado Civil',
      icon: 'info'});
      return;
  }

  if(!this.pac.pac_estructura_fam){
    this.blockUI.stop();
    swal.fire({
      title: 'ERROR!!!',
      text: 'Falta Ingresar Estructura Familiar',
      icon: 'info'});
      return;
  }

  if(!this.pac.pac_estructura_fam){
    this.blockUI.stop();
    swal.fire({
      title: 'ERROR!!!',
      text: 'Falta Ingresar Estructura Familiar',
      icon: 'info'});
      return;
  }

  if(!this.pac.pac_escolaridad){
    this.blockUI.stop();
    swal.fire({
      title: 'ERROR!!!',
      text: 'Falta Ingresar Escolaridad',
      icon: 'info'});
      return;
  }

  if(!this.pac.pac_ocupacion){
    this.blockUI.stop();
    swal.fire({
      title: 'ERROR!!!',
      text: 'Falta Ingresar Ocupación',
      icon: 'info'});
      return;
  }

  if(!this.pac.pac_email){
    this.blockUI.stop();
    swal.fire({
      title: 'ERROR!!!',
      text: 'Falta Ingresar Email',
      icon: 'info'});
      return;
  }

  if(!this.pac.pac_email){
    this.blockUI.stop();
    swal.fire({
      title: 'ERROR!!!',
      text: 'Falta Ingresar Email',
      icon: 'info'});
      return;
  }

  if(!this.pac.pac_telefono){
    this.blockUI.stop();
    swal.fire({
      title: 'ERROR!!!',
      text: 'Falta Ingresar Teléfono de Contacto',
      icon: 'info'});
      return;
  }

  if(!this.pac.pac_contacto_eme){
    this.blockUI.stop();
    swal.fire({
      title: 'ERROR!!!',
      text: 'Falta Ingresar Contacto de Emergencia',
      icon: 'info'});
      return;
  }

  if(!this.pac.pac_telefono_eme){
    this.blockUI.stop();
    swal.fire({
      title: 'ERROR!!!',
      text: 'Falta Ingresar Teléfono en Caso de Emergencia',
      icon: 'info'});
      return;
  }

  if(!this.pac.pac_domicilio){
    this.blockUI.stop();
    swal.fire({
      title: 'ERROR!!!',
      text: 'Falta Ingresar Domicilio',
      icon: 'info'});
      return;
  }

  this.pac.pac_usr_id=this.userId ;
  console.log(this.pac);
  console.log(this.datePipe.transform(this.pac.pac_fecha_ingreso,"yyyy-MM-dd")); 
  console.log(this.datePipe.transform(this.pac.pac_fecha_nacimiento,"yyyy-MM-dd")); 
  this.fnac=this.datePipe.transform(this.pac.pac_fecha_nacimiento,"yyyy-MM-dd");
  this.fing=this.datePipe.transform(this.pac.pac_fecha_ingreso,"yyyy-MM-dd");
  this.pac.pac_fecha_ingreso= this.fing;
  this.pac.pac_fecha_nacimiento= this.fnac;
  console.log(this.pac);
  this.subscription = this._pac.RegistroPacientes(this.pac)
      .subscribe((data: any) => {
          if ( data != null) {
              this.blockUI.stop();
              console.log(data);
              swal.fire({
                  icon: 'success',
                  title: 'Paciente Registrado',
                  text: 'Registro Exitoso ',
                  timer: 2000
              });
              this.router.navigate(['/pacientes']);
              
          } else{
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
              icon: 'error'});
      });
  }

}
