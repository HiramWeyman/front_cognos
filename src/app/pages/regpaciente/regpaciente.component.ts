import { Pacientes } from '@/models/Pacientes';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PacientesService } from '@services/pacientes.service';
import { Subscription } from 'rxjs';
import swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-regpaciente',
  templateUrl: './regpaciente.component.html',
  styleUrls: ['./regpaciente.component.scss']
})
export class RegpacienteComponent implements OnInit{
pac:Pacientes=new Pacientes();
private subscription: Subscription;
public userId: any = null;
public fnac: any = null;
public fing: any = null;
tutor: any[];
terapeutas:any[];
constructor(
  private _pac: PacientesService,
  private router: Router,
  private datePipe: DatePipe
  
) {}
  ngOnInit(): void {
    this.userId = sessionStorage.getItem('UserId');
    this.cargarTutores();
    this.tutor=[0];
    this.cargarTerapeutas();
    this.terapeutas=[0];
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
              console.log(data);
              swal.fire({
                  icon: 'success',
                  title: 'Paciente Registrado',
                  text: 'Registro Exitoso ',
                  timer: 2000
              });
              this.router.navigate(['/pacientes']);
              
          } else{
              swal.fire({
                  icon: 'error',
                  title: 'Ocurrio un error en el registro'
              });
          }	
      },
      error => {
          //console.log(error.error.Message);
          swal.fire({
              title: 'ERROR!!!',
              text: error.error.Message,
              icon: 'error'});
      });
  }

}
