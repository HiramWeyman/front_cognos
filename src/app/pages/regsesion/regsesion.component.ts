import { Pacientes } from '@/models/Pacientes';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PacientesService } from '@services/pacientes.service';
import { Subscription } from 'rxjs';
import swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-regsesion',
  templateUrl: './regsesion.component.html',
  styleUrls: ['./regsesion.component.scss']
})
export class RegsesionComponent {
  pac:Pacientes=new Pacientes();
private subscription: Subscription;
public userId: any = null;
public fnac: any = null;
public fing: any = null;
expediente!: any;
constructor(
  private _pac: PacientesService,
  private router: Router,
  private datePipe: DatePipe
  
) {}
  ngOnInit(): void {
    this.userId = sessionStorage.getItem('UserId');
    this.expediente=sessionStorage.getItem('Expediente');
    console.log(this.userId);
    console.log(this.expediente);
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
