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
    this.expediente=localStorage.getItem('Expediente');
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
    console.log(this.myInputSCL.nativeElement.files);
    this.myInputSCL.nativeElement.value = "";
    this.myInputSCLup.nativeElement.value = "";
    console.log(this.myInputSCL.nativeElement.files);
  }

    guardarMaestro(){
      this._env.InsertaMaestro(this.id, this.fecArchivo,this.ObservacionArchivo).subscribe(resp=>{
        console.log("InsertaMaestro",resp);
        if(resp){
          this.respuesta=resp;
          swal.fire({ title: 'Success!!!', text: "Guardado", icon: 'success' });
          this.modalClose3.nativeElement.click();
  
        }
        this.ngOnInit();
        
      });
    }

     Actualizar(imagen_id: number) {
        console.log(imagen_id);
    
    
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
    
        //idX = this.pruebascl.documentId;
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
    
        this._env.UpdateArchivo(imagen_id, this.prueba).subscribe(usr => {
    
          this.blockUI.stop();
          //this.resetFileUploader();
          swal.fire('Archivos subidos', `Su archivo se actualizo con éxito!`, 'success');
          this.resetInput();
          this.prueba = null;
       
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

      VerImagen(id_imagen:number) {
        console.log(id_imagen);
        if(id_imagen==0){
          swal.fire({
            title: 'Info!!!',
            text: 'No hay ninguna imagen para mostrar',
            icon: 'info',
            timer: 4000
          });
          return;
        }
        this._env.GetArchivo(id_imagen).subscribe(
          pac => {
            this.diagramaFoto = pac;
            console.log(this.diagramaFoto);
            const base64ImageData = 'data:image/png;base64,' + this.diagramaFoto.dataFiles;
            const contentType = 'image/png';
        
            const byteCharacters = atob(base64ImageData.substr(`data:${contentType};base64,`.length));
            const byteArrays = [];
        
            for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
              const slice = byteCharacters.slice(offset, offset + 1024);
        
              const byteNumbers = new Array(slice.length);
              for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
              }
        
              const byteArray = new Uint8Array(byteNumbers);
        
              byteArrays.push(byteArray);
            }
            const blob = new Blob(byteArrays, { type: contentType });
            const blobUrl = URL.createObjectURL(blob);
        
            window.open(blobUrl, '_blank'); 
    
          }, error => {
            //console.log(error);
            swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
          });
       
      
      }
    

  cargarMaestro() {
    this._env.getArchivos(this.id).subscribe(
      fu => {
        this.resultados_arch = fu;
        for(let i=0;i<this.resultados_arch.length;i++){
          this.fecMaestro =this.datePipe.transform(this.resultados_arch[i].maestro_fecha,"dd/MM/yyyy");
          this.resultados_arch[i].maestro_fecha= this.fecMaestro;
          if(this.resultados_arch[i].maestro_id_imagen==null){
            this.resultados_arch[i].maestro_id_imagen=0;
          }
        }
        console.log(this.resultados_arch);
      }, error => {
        console.log(error);
        //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }
}
