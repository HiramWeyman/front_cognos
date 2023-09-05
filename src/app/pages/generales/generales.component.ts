import { Pacientes } from '@/models/Pacientes';
import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PacientesService } from '@services/pacientes.service';
import { Subscription } from 'rxjs';
import swal from 'sweetalert2';


@Component({
  selector: 'app-generales',
  templateUrl: './generales.component.html',
  styleUrls: ['./generales.component.scss']
})
export class GeneralesComponent {
  pac: Pacientes = new Pacientes();
  pacientes: Pacientes[];
  private subscription: Subscription;
  public ExpedienteId: any = null;
  public fnac: any = null;
  public fing: any = null;
  fec: any;
  constructor(
    private _pac: PacientesService,
    private router: Router,
    private datePipe: DatePipe

  ) { }
  ngOnInit(): void {
    this.ExpedienteId = sessionStorage.getItem('Expediente');
    this.cargarPacientes();
  }



  ActualizarPac() {
    console.log(this.pac);
    this.subscription = this._pac.UpdatePacientes(this.pac)
        .subscribe((data: any) => {
          swal.fire({
            icon: 'success',
            title: 'Paciente Actualizado',
            text: 'Actualización Exitosa ',
            timer: 2000
        });
      /*   this.router.navigate(['/generales']); */
        this.ngOnInit();
        },
        error => {
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
        this.pac = pac;
        console.log(this.pac);
      }, error => {
        //console.log(error);
        swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }
}
