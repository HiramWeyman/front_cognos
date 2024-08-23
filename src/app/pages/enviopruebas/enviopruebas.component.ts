import { Pacientes } from '@/models/Pacientes';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PruebasService } from '@services/enviarpruebas.service';
import { PacientesService } from '@services/pacientes.service';
import { SharednumberService } from '@services/sharednumber.service';
import swal from 'sweetalert2';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { AppService } from '@services/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-enviopruebas',
  templateUrl: './enviopruebas.component.html',
  styleUrls: ['./enviopruebas.component.scss']
})
export class EnviopruebasComponent implements OnInit {
  @BlockUI()
  blockUI!: NgBlockUI;
  ExpedienteId!: any;
  Sessiontab!: any;
  UsuarioId: any;
  UsuarioNombre: any;
  Indextab: any;
  pac: Pacientes = new Pacientes();
  pruebascl: any;
  pruebascid: any;
  prueba!: File;
  habilitaSCL: boolean = false;
  habilitaSCID: boolean = false;
  @ViewChild('myInputSCL')
  myInputSCL!: ElementRef;
  @ViewChild('myInputSCLup')
  myInputSCLup!: ElementRef;
  @ViewChild('myInputSCID')
  myInputSCID!: ElementRef;
  @ViewChild('myInputSCIDup')
  myInputSCIDup!: ElementRef;
  constructor(

    private sharednumber: SharednumberService,
    private _pac: PacientesService,
    private _env: PruebasService,
    private appService: AppService,
    private router: Router

  ) { }
  ngOnInit(): void {

    this.ExpedienteId = localStorage.getItem('Expediente');
    this.Sessiontab = localStorage.getItem('IndexTab');
    this.UsuarioId = localStorage.getItem('UserId');
    this.UsuarioNombre = localStorage.getItem('UserName');
    this.sharednumber.numero$.subscribe(val => {
      this.Indextab = val;
      if (this.Indextab == 10 || this.Sessiontab == 10) {
        this.cargarPacientes();
        this.cargarPruebaSCL();
        this.cargarPruebaSCID();
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

  cargarPruebaSCL() {
    this._env.GetPruebaSCL(this.ExpedienteId).subscribe(
      pac => {
        this.pruebascl = pac;
        console.log(this.pruebascl);
        if (this.pruebascl != null) {
          this.habilitaSCL = true;
        }
        else {
          this.habilitaSCL = false;
        }
      }, error => {
        //console.log(error);
        swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }

  cargarPruebaSCID() {
    this._env.GetPruebaSCID(this.ExpedienteId).subscribe(
      pac => {
        this.pruebascid = pac;
        console.log(this.pruebascid);
        if (this.pruebascid != null) {
          this.habilitaSCID = true;
        }

      }, error => {
        //console.log(error);
        swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }

  enviarPruebas(num_prueba: number) {
    this._env.EnviarPrueba(this.pac.pac_id, this.pac.pac_email, num_prueba).subscribe(prb => {

      console.log(prb);
      /*    swal.fire('Enviando Correo', `Correo Enviado Exitosamente!`, 'success'); */
      if (prb) {
        swal.fire('Enviando Correo', `Correo Enviado Exitosamente!`, 'success');
      }
    }, error => {
      console.log(error);
      //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
    });

  }

  aplicarPruebas(num_prueba: number) {
    switch (num_prueba) {

      case 2:
        window.open("https://pruebas.iescognos.com/inicio/"+this.ExpedienteId, "_blank");
        break;
      case 5:
        window.open("https://pruebas.iescognos.com/testscid/"+this.ExpedienteId, "_blank");
        break;

      case 1:
        window.open("https://pruebas.iescognos.com/testbaian/"+this.ExpedienteId, "_blank");
        break;

      case 3:
        window.open("https://pruebas.iescognos.com/testbdidp/"+this.ExpedienteId, "_blank");
        break;

      case 4:
        window.open("https://pruebas.iescognos.com/testisra/"+this.ExpedienteId, "_blank");
        break;

      case 6:
        http://localhost:8000/
       // window.open("http://localhost:8000/testcreencias/"+this.ExpedienteId, "_blank");
        window.open("https://pruebas.iescognos.com/testcreencias/"+this.ExpedienteId, "_blank");
        break;
    }

  }


  public seleccionarPrueba(event: Event): void {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    const file = files[0];
    console.log(files);
    this.prueba = file;
    console.info(this.prueba);
  }



  guardar(tipo_prueba: number) {
    this.blockUI.start('Guardando...');
    /*   console.log(this.ponencia_id); */
    if (this.prueba == null) {
      this.blockUI.stop();
      swal.fire({
        title: 'Info!!!',
        text: 'Seleccione el archivo de su prueba Test SCL 90 R',
        icon: 'info',
        timer: 2000
      });

      return;
    }
    console.info(this.prueba.name);
    console.info(this.prueba);

    this._env.pruebasAll(this.pac.pac_id, tipo_prueba, this.prueba).subscribe(usr => {

      if (usr) {
        this.blockUI.stop();
        swal.fire('Archivos subidos', `Sus archivos se subieron con éxito!`, 'success');
        this.ngOnInit();
        this.prueba = null;
        this.resetInput();
      }

    },
      error => {
        console.log(error);
        this.blockUI.stop();
        swal.fire({
          title: 'ERROR!!!',
          text: error.error.message,
          icon: 'error'
        });

      });


  }


  Actualizar(tipi_prueba: number) {
    var idX: number;
    if (this.pruebascl == null || !this.pruebascid == null) {
      this.blockUI.stop();
      swal.fire({
        title: 'Info!!!',
        text: 'No hay archivo para actualizar',
        icon: 'info',
        timer: 2000
      });
      return;
    }

    if (this.prueba == null) {
      this.blockUI.stop();
      swal.fire({
        title: 'Info!!!',
        text: 'Seleccione el archivo para actualizar',
        icon: 'info',
        timer: 2000
      });

      return;
    }


    if (tipi_prueba == 1) {
      idX = this.pruebascl.documentId;
    }
    else {
      idX = this.pruebascid.documentId;
    }
    this.blockUI.start('Guardando...');
    /*   console.log(this.ponencia_id); */
    if (this.prueba == null) {
      this.blockUI.stop();
      swal.fire({
        title: 'Info!!!',
        text: 'Seleccione el archivo de su prueba Test SCL 90 R',
        icon: 'info',
        timer: 2000
      });

      return;
    }
    console.info(this.prueba.name);
    console.info(this.prueba);

    this._env.UpdatePrueba(idX, this.prueba).subscribe(usr => {

      this.blockUI.stop();
      this.resetFileUploader();
      swal.fire('Archivos subidos', `Su archivo se actualizo con éxito!`, 'success');
      this.resetInput();
      this.prueba = null;
      this.cargarPruebaSCL();
      this.cargarPruebaSCID();

      this.myInputSCL.nativeElement.value = "";
      /*   this.resetInput(); */
    },
      error => {
        console.log(error);
        this.blockUI.stop();
        swal.fire({
          title: 'ERROR!!!',
          text: error.error.message,
          icon: 'error'
        });

      });

  }

  /*   .then(
      function(){
        window.location.reload();
      }
    ) */
  Delete(tipo_prueba: number) {

    if (this.pruebascl == null || !this.pruebascid == null) {
      swal.fire({
        title: 'Info!!!',
        text: 'No hay archivo para eliminar',
        icon: 'info',
        timer: 2000
      });
      return;
    }

    if (tipo_prueba == 1) {
      this.blockUI.start('Eliminando...');
      this._env.DeletePruebas(tipo_prueba, this.pruebascl.documentId).subscribe(usr => {

        if (usr) {
          this.blockUI.stop();
          swal.fire('Archivo Eliminado', `Su archivo se elimino con éxito!`, 'success');
          this.ngOnInit();
          this.resetInput();
        }


      },
        error => {
          console.log(error);
          this.blockUI.stop();
          swal.fire({
            title: 'ERROR!!!',
            text: error.error.message,
            icon: 'error'
          });

        });
    } else {
      this.blockUI.start('Eliminando...');
      this._env.DeletePruebas(tipo_prueba, this.pruebascid.documentId).subscribe(usr => {

        if (usr) {
          this.blockUI.stop();
          swal.fire('Archivo Eliminado', `Su archivo se elimino con éxito!`, 'success');
          this.ngOnInit();
          this.resetInput();
        }
      },
        error => {
          console.log(error);
          this.blockUI.stop();
          swal.fire({
            title: 'ERROR!!!',
            text: error.error.message,
            icon: 'error'
          });

        });
    }

  }

  resetFileUploader() {
    this.myInputSCL.nativeElement.value = null;
  }
  refresh(): void {
    window.location.reload();
  }
  resetInput() {
    console.log(this.myInputSCL.nativeElement.files);
    this.myInputSCL.nativeElement.value = "";
    this.myInputSCLup.nativeElement.value = "";

    console.log(this.myInputSCL.nativeElement.files);

    console.log(this.myInputSCID.nativeElement.files);
    this.myInputSCID.nativeElement.value = "";
    this.myInputSCIDup.nativeElement.value = '';

    console.log(this.myInputSCID.nativeElement.files);

  }


  archivo1() {
    window.open("assets/files/Alta de paciente Unidad Bajo Costo.docx", "_blank");
  }

  archivo2() {
    window.open("assets/files/Anexo - Evaluación escolar COGNOS.docx", "_blank");
  }

  archivo3() {
    window.open("assets/files/Baja de paciente Unidad Bajo Costo.docx", "_blank");
  }

  archivo4() {
    window.open("assets/files/Canalización paciente online a presencial.docx", "_blank");
  }

  archivo5() {
    window.open("assets/files/Consentimiento de Estudio de caso para Tesis.docx", "_blank");
  }

  archivo6() {
    window.open("assets/files/Consentimiento de grabación en audio.docx", "_blank");
  }

  archivo7() {
    window.open("assets/files/Consentimiento Informado Online Maestria.docx", "_blank");
  }

  archivo8() {
    window.open("assets/files/Consentimiento Informado Presencial Maestria.docx", "_blank");
  }

  archivo9() {
    window.open("assets/files/Consentimiento para la evaluación escolar COGNOS.docx", "_blank");
  }

  archivo10() {
    window.open("assets/files/Consentimiento para solicitar información en escuela para padres.docx", "_blank");
  }

}
