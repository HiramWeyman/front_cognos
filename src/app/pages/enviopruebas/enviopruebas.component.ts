import { Pacientes } from '@/models/Pacientes';
import { Component, OnInit } from '@angular/core';
import { PruebasService } from '@services/enviarpruebas.service';
import { PacientesService } from '@services/pacientes.service';
import { SharednumberService } from '@services/sharednumber.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-enviopruebas',
  templateUrl: './enviopruebas.component.html',
  styleUrls: ['./enviopruebas.component.scss']
})
export class EnviopruebasComponent implements OnInit {
  ExpedienteId!: any;
  Sessiontab!: any;
  UsuarioId: any;
  UsuarioNombre: any;
  Indextab:any;
  pac: Pacientes = new Pacientes();
  constructor(
 
    private sharednumber:SharednumberService,
    private _pac: PacientesService,
    private _env:PruebasService

  ) { }
  ngOnInit(): void {
    this.ExpedienteId=sessionStorage.getItem('Expediente');
    this.Sessiontab=sessionStorage.getItem('IndexTab');
    this.UsuarioId=sessionStorage.getItem('UserId');
    this.UsuarioNombre=sessionStorage.getItem('UserName');
    this.sharednumber.numero$.subscribe(val=>
      {
        this.Indextab=val;
        if(this.Indextab==10||this.Sessiontab==10){
          this.cargarPacientes();
        }
      });
    
  }

  cargarPacientes() {
    this._pac.GetPaciente(this.ExpedienteId).subscribe(
      pac => {
        this.pac = pac;
       /*  console.log(this.pac); */
       
      }, error => {
        //console.log(error);
        swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }

  enviarPruebas(num_prueba:number)
  {
    this._env.EnviarPrueba(this.pac.pac_id,this.pac.pac_email,num_prueba).subscribe(prb=>{

      console.log(prb);
   /*    swal.fire('Enviando Correo', `Correo Enviado Exitosamente!`, 'success'); */
      if(prb){
        swal.fire('Enviando Correo', `Correo Enviado Exitosamente!`, 'success');
      }
    },error => {
      console.log(error);
      //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
    });

  }

}
