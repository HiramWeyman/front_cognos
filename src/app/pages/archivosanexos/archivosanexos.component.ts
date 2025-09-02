import { Pacientes } from '@/models/Pacientes';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PruebasService } from '@services/enviarpruebas.service';
import { PacientesService } from '@services/pacientes.service';
import { SharednumberService } from '@services/sharednumber.service';
import swal from 'sweetalert2';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { AppService } from '@services/app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Maestro_hist } from '@/models/Maestro_hist';
import { MaestroCambio } from '@/models/MaestroCambio';
import { AnexosService } from '@services/anexos.services';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-archivosanexos',
  templateUrl: './archivosanexos.component.html',
  styleUrls: ['./archivosanexos.component.scss']
})
export class ArchivosanexosComponent implements OnInit {
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

  ObservacionArchivo: any;
  fecArchivo: any;
  resultados_arch: any[];


  id!: any;
  resultados: any[];
  resultados_hist: any[];
  selectedItems: MaestroCambio[] = [];
  total!: any;
  fecMaestro: any;
  fecHistorico: any;
  ObservacionHistorico: any;
  Maestro_hist: Maestro_hist = new Maestro_hist();
  expediente!: any;
  habilitaSCL: boolean = false;

  diagramaFoto: any;
  respuesta!: any;
  @ViewChild('myInputSCL')
  myInputSCL!: ElementRef;
  @ViewChild('myInputSCLup')
  myInputSCLup!: ElementRef;
  @ViewChild('myModalClose3') modalClose3;

  constructor(

    private sharednumber: SharednumberService,
    private _pac: PacientesService,
    private _env: AnexosService,
    private appService: AppService,
    private router: Router,
    private datePipe: DatePipe,
    private route: ActivatedRoute

  ) { }
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.expediente = localStorage.getItem('Expediente');
    this.Sessiontab = localStorage.getItem('IndexTab');
    this.UsuarioId = localStorage.getItem('UserId');
    this.UsuarioNombre = localStorage.getItem('UserName');
    this.sharednumber.numero$.subscribe(val => {
      this.Indextab = val;
      if (this.Indextab == 14 || this.Sessiontab == 14) {
        this.cargarMaestro();
        /*     this.cargarPruebaSCL();
            this.cargarPruebaSCID(); */
      }
    });
    this.cargarMaestro();

  }

  public seleccionarArchivo(event: Event): void {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    const file = files[0];
    console.log(files);
    this.prueba = file;
    console.info(this.prueba);
  }

  guardarImgArchivo(maestro_id: number) {
    this.blockUI.start('Guardando...');

    // Verificar si un archivo fue seleccionado
    if (this.prueba == null) {
      this.blockUI.stop();
      swal.fire({
        title: 'Info!!!',
        text: 'Seleccione el archivo',
        icon: 'info',
        timer: 2000
      });
      return;
    }
    console.info(this.prueba.name);
    console.info(this.prueba);

    // Continuar con el proceso de guardado
    this._env.archivoAnexo(this.expediente, 7, maestro_id, this.prueba).subscribe(
      usr => {
        if (usr) {
          this.blockUI.stop();
          swal.fire('Archivos subidos', `Sus archivos se subieron con éxito!`, 'success');
          this.ngOnInit();
          this.prueba = null;
          this.resetInput();
          this.cargarMaestro();
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
      }
    );
  }

  resetInput() {
  /*   console.log(this.myInputSCL.nativeElement.files);
    this.myInputSCL.nativeElement.value = ""; */
    this.myInputSCLup.nativeElement.value = "";
    console.log(this.myInputSCL.nativeElement.files);
  }

  guardarMaestro() {
    this._env.InsertaMaestro(this.id, this.fecArchivo, this.ObservacionArchivo).subscribe(resp => {
      console.log("InsertaMaestro", resp);
      if (resp) {
        this.respuesta = resp;
        swal.fire({ title: 'Success!!!', text: "Guardado", icon: 'success' });
        this.modalClose3.nativeElement.click();

      }
      this.ngOnInit();

    });
  }

  Actualizar(maestro_id: number) {
    console.log(maestro_id);
    swal.fire({
      title: "Esta seguro de eliminar el archivo?",
      text: "Usted eliminara del sistema el archivo!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminalo!",
      cancelButtonText: "Cancelar!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.blockUI.start('Guardando...');
         this._env.delete(maestro_id).subscribe(() => {
          this.blockUI.stop();
          swal.fire({
          title: "Eliminado!",
          text: "Su archivo ha sido eliminado.",
          icon: "success"
        });
          this.cargarMaestro();
        });
        
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

  VerArchivo(id_imagen: number) {
    if (id_imagen == 0) {
      swal.fire({
        title: 'Info!!!',
        text: 'No hay ninguna imagen para mostrar',
        icon: 'info',
        timer: 4000
      });
      return;
    }

    this._env.GetArchivo(id_imagen).subscribe(response => {
      // console.log(response);
      const file = response.body as Blob;
      //console.log(file);
      // 🔍 Obtener nombre de archivo desde Content-Disposition
      const contentDisposition = response.headers.get('Content-Disposition');
      let fileName = 'archivo';
      //console.log(contentDisposition);
      if (contentDisposition) {
        const matches = /filename\*?=(?:UTF-8'')?["']?([^\"';]+)["']?/i.exec(contentDisposition);
        if (matches != null && matches[1]) {
          fileName = decodeURIComponent(matches[1]);
          console.log(fileName);
        }
      }

      // Crear URL temporal
      const fileURL = URL.createObjectURL(file);

      // PDF/imagen → abrir inline
      if (response.headers.get('Content-Type')?.includes('pdf') ||
        response.headers.get('Content-Type')?.startsWith('image')) {
        window.open(fileURL, '_blank');
      } else {
        // Word, Excel, etc. → forzar descarga con nombre real
        const a = document.createElement('a');
        a.href = fileURL;
        a.download = fileName;   // 👈 ahora usa el nombre real
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(fileURL);
      }
    });
  }




  cargarMaestro() {
    this._env.getArchivos(this.id).subscribe(
      fu => {
        this.resultados_arch = fu;
        console.log(this.resultados_arch);
        for (let i = 0; i < this.resultados_arch.length; i++) {
          this.fecMaestro = this.datePipe.transform(this.resultados_arch[i].maestro_fecha, "dd/MM/yyyy");
          this.resultados_arch[i].maestro_fecha = this.fecMaestro;
          if (this.resultados_arch[i].maestro_id_imagen == null) {
            this.resultados_arch[i].maestro_id_imagen = 0;
          }
        }
        console.log(this.resultados_arch);
      }, error => {
        console.log(error);
        //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }
}
