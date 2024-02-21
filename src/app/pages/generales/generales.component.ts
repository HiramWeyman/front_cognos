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
  selectedValue: any;
  fec: any;
  tutor: any[];
  terapeutas: any[];
  alumnos: any[];
  perfil:any;
  constructor(
    private _pac: PacientesService,
    private router: Router,
    private datePipe: DatePipe,
    private sharednumber:SharednumberService
  ) { }
  ngOnInit(): void {
    this.ExpedienteId = sessionStorage.getItem('Expediente');
    this.Sessiontab=sessionStorage.getItem('IndexTab');
    this.perfil=sessionStorage.getItem('UserPerfil');
    this.cargarPacientes();
    this.cargarTutores();
    this.cargarTerapeutas();
    this.cargarAlumnos();
 /*    this.sharednumber.numero$.subscribe(val=>
      {
        this.Indextab=val;
        if(this.Indextab==0||this.Sessiontab==0){
         
        }
      }); */
    
  }



  ActualizarPac() {
    console.log(this.pac);
    if(this.pac.pac_terapeuta==0){
      this.pac.pac_terapeuta==null;
    }
    if(this.pac.pac_coterapeuta==0){
      this.pac.pac_coterapeuta==null;
    }
    this.subscription = this._pac.UpdatePacientes(this.pac)
        .subscribe((data: any) => {
          swal.fire({
            icon: 'success',
            title: 'Paciente Actualizado',
            text: 'Actualización Exitosa ',
            timer: 2000
        });
         this.router.navigate(['/exp/'+this.ExpedienteId]); 
     /*    this.ngOnInit(); */
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
        if(this.pac.pac_terapeuta==null){
          this.pac.pac_terapeuta==0;
        }
        if(this.pac.pac_coterapeuta==null){
          this.pac.pac_coterapeuta==0;
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
}
