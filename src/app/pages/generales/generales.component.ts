import { Pacientes } from '@/models/Pacientes';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PacientesService } from '@services/pacientes.service';
import { SharednumberService } from '@services/sharednumber.service';
import { Subscription } from 'rxjs';
import swal from 'sweetalert2';


@Component({
  selector: 'app-generales',
  templateUrl: './generales.component.html',
  styleUrls: ['./generales.component.scss']
})
export class GeneralesComponent implements OnInit{
  pac: Pacientes = new Pacientes();
  pacientes: Pacientes[];
  private subscription: Subscription;
  public ExpedienteId: any = null;
  public Indextab: any = null;
  public Sessiontab: any = null;
  public fnac: any = null;
  public fing: any = null;
  fec: any;
  tutor: any[];
  constructor(
    private _pac: PacientesService,
    private router: Router,
    private datePipe: DatePipe,
    private sharednumber:SharednumberService
  ) { }
  ngOnInit(): void {
    this.ExpedienteId = sessionStorage.getItem('Expediente');
    this.Sessiontab=sessionStorage.getItem('IndexTab');
    this.cargarPacientes();
    this.cargarTutores();
 /*    this.sharednumber.numero$.subscribe(val=>
      {
        this.Indextab=val;
        if(this.Indextab==0||this.Sessiontab==0){
         
        }
      }); */
    
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
}
