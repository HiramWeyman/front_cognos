import { Component, ElementRef, ViewChild } from '@angular/core';
import { Maestro } from '@/models/Maestro';
import { MaestroCambio } from '@/models/MaestroCambio';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '@services/app.service';
import { ResultadosService } from '@services/resultados.service';
import Swal from 'sweetalert2';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { CreenciasService } from '@services/creencias.service';

@Component({
  selector: 'app-res-cree',
  templateUrl: './res-cree.component.html',
  styleUrls: ['./res-cree.component.scss']
})

export class ResCreeComponent {
  @BlockUI()
  blockUI!: NgBlockUI;
  id!: any;
  resultados: any[];
  resultados_hist: any[];
  prueba!: File;
  diagramaFoto: any;
  fecHistorico:any;
  ObservacionHistorico:any;
  selectedItems: MaestroCambio[] = []; 
  total!:any;
  fecMaestro:any;
  expediente!: any;
  respuesta!:any;
  @ViewChild('myInputBAIAN')
  myInputBAIAN!: ElementRef;
  @ViewChild('myInputSCLup')
  myInputBAIANup!: ElementRef;
  @ViewChild('myModalClose3') modalClose3; // Referencia al boton en modal en el HTML para fecha de reingreso


  constructor(private route: ActivatedRoute, private _res: ResultadosService,private _env: CreenciasService, private datePipe: DatePipe,private appService: AppService,private router: Router) {

  }
  ngOnInit(): void {
  
    this.expediente=localStorage.getItem('Expediente');
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    this.cargarMaestroResCREE();
    this.cargarMaestroResHistCREE();
  }



  cargarMaestroResCREE() {
    this._res.getResCREEMaestro(this.id).subscribe(
      fu => {
        this.resultados = fu;
        for(let i=0;i<this.resultados.length;i++){
          this.fecMaestro =this.datePipe.transform(this.resultados[i].maestro_fecha,"dd/MM/yyyy");
          this.resultados[i].maestro_fecha= this.fecMaestro;
          this.resultados[i].selected = false; // Inicializa la propiedad selected
        }
        console.log(this.resultados);
      }, error => {
        console.log(error);
        //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }

  cargarMaestroResHistCREE() {
    this._res.getResHistCREEMaestro(this.id).subscribe(
      fu => {
        this.resultados_hist = fu;
        for(let i=0;i<this.resultados_hist.length;i++){
          this.fecMaestro =this.datePipe.transform(this.resultados_hist[i].maestro_fecha,"dd/MM/yyyy");
          this.resultados_hist[i].maestro_fecha= this.fecMaestro;
          this.resultados_hist[i].selected = false; // Inicializa la propiedad selected
        }
        console.log(this.resultados_hist);
      }, error => {
        console.log(error);
        //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }

  public seleccionarPrueba(event: Event): void {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    const file = files[0];
    console.log(files);
    this.prueba = file;
    console.info(this.prueba);
  }

  getSelectedItems() {
    
    this.selectedItems = this.resultados.filter(item => item.selected);
    if(this.selectedItems.length==0){
      Swal.fire({ title: 'Información!!!', text:'Seleccione al menos un registro', icon: 'info' });
    }
    else{
      const idsConcatenados = this.selectedItems
      .map(item => item.maestro_id)
      .join(',');
  
       console.log(idsConcatenados); // Para verificar la cadena concatenada
       this._res.AsignarIds(idsConcatenados,6,this.expediente).subscribe(
        data=>{
          console.log(data);
            if(data){
              this.respuesta=data;
              Swal.fire({ title: 'Success!!!', text: this.respuesta.descripcion, icon: 'success' });
            }
        });

    }
    //console.log(this.selectedItems); // Para verificar los elementos seleccionados
  }

  guardarImgHist(maestro_id: number) {
    this.blockUI.start('Guardando...');
    
    // Verificar si un archivo fue seleccionado
    if (this.prueba == null) {
      this.blockUI.stop();
      Swal.fire({
        title: 'Info!!!',
        text: 'Seleccione el archivo de su prueba Test Creencias Ellis',
        icon: 'info',
        timer: 2000
      });
      return;
    }
  
    // Obtener la extensión del archivo
    const fileExtension = this.prueba.name.split('.').pop().toLowerCase();
  
    // Validar si la extensión es una de las permitidas
    const allowedExtensions = ['png', 'jpg', 'jpeg'];
    if (!allowedExtensions.includes(fileExtension)) {
      this.blockUI.stop();
      Swal.fire({
        title: 'Archivo no válido',
        text: 'Solo se permiten archivos de imagen con extensiones .png, .jpg, .jpeg',
        icon: 'warning',
        timer: 4000
      });
      return;
    }
  
    console.info(this.prueba.name);
    console.info(this.prueba);
  
    // Continuar con el proceso de guardado
    this._env.pruebasCREEHist(this.expediente, 1, maestro_id, this.prueba).subscribe(
      usr => {
        if (usr) {
          this.blockUI.stop();
          Swal.fire('Archivos subidos', `Sus archivos se subieron con éxito!`, 'success');
          this.ngOnInit();
          this.prueba = null;
          this.resetInput();
          this.cargarMaestroResCREE();
          this.cargarMaestroResHistCREE();
        }
      },
      error => {
        console.log(error);
        this.blockUI.stop();
        Swal.fire({
          title: 'ERROR!!!',
          text: error.error.message,
          icon: 'error'
        });
      }
    );
  }
  

  Actualizar(imagen_id: number) {
    console.log(imagen_id);
    //var idX: number;
 /*    if (this.pruebascl == null ) {
      this.blockUI.stop();
      swal.fire({
        title: 'Info!!!',
        text: 'No hay archivo para actualizar',
        icon: 'info',
        timer: 2000
      });
      return;
    } */

    if (this.prueba == null) {
      this.blockUI.stop();
      Swal.fire({
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
      Swal.fire({
        title: 'Info!!!',
        text: 'Seleccione el archivo de su prueba Test BAI',
        icon: 'info',
        timer: 2000
      });

      return;
    }
    console.info(this.prueba.name);
    console.info(this.prueba);

    this._env.UpdatePruebaCREE(imagen_id, this.prueba).subscribe(usr => {

      this.blockUI.stop();
      //this.resetFileUploader();
      Swal.fire('Archivos subidos', `Su archivo se actualizo con éxito!`, 'success');
      this.resetInput();
      this.prueba = null;
   
      this.myInputBAIAN.nativeElement.value = "";
      /*   this.resetInput(); */
    },
      error => {
        console.log(error);
        this.blockUI.stop();
        Swal.fire({
          title: 'ERROR!!!',
          text: error.error.message,
          icon: 'error'
        });

      });

  }

  resetInput() {
    console.log(this.myInputBAIAN.nativeElement.files);
    this.myInputBAIAN.nativeElement.value = "";
    this.myInputBAIANup.nativeElement.value = "";
    console.log(this.myInputBAIAN.nativeElement.files);

  }

  VerImagen(id_imagen:number) {
    console.log(id_imagen);
    if(id_imagen==0){
      Swal.fire({
        title: 'Info!!!',
        text: 'No hay ninguna imagen para mostrar',
        icon: 'info',
        timer: 4000
      });
      return;
    }
    this._env.GetDiagrama(id_imagen).subscribe(
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
        Swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }

  guardarHist(){
    this._env.InsertaMaestro(this.id, this.fecHistorico,this.ObservacionHistorico).subscribe(resp=>{
      console.log("InsertaMaestro",resp);
      if(resp){
        this.respuesta=resp;
        Swal.fire({ title: 'Success!!!', text: "Guardado", icon: 'success' });
        this.modalClose3.nativeElement.click();

      }
      this.ngOnInit();
      
    });
  }

}
