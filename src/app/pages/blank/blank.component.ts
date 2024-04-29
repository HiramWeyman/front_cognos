import { Padron } from '@/models/Padron';
import { Terapeutas } from '@/models/Terapeutas';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from '@services/app.service';
import { PadronService } from '@services/padron.service';
import { TerapeutasService } from '@services/terapeutas.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import swal from 'sweetalert2';
@Component({
    selector: 'app-blank',
    templateUrl: './blank.component.html',
    styleUrls: ['./blank.component.scss']
})
export class BlankComponent {
    searchString: string = '';
    pad:Padron =new Padron();
    tera:Terapeutas=new Terapeutas();
    items: any[];
    resp:any;
    @BlockUI()
    blockUI!: NgBlockUI;
    @ViewChild('myModalClose') modalClose;
    constructor(private terap: TerapeutasService,private appService: AppService,) { }
  
    ngOnInit(): void {
      this.blockUI.start('Cargando Datos...');
      this.terap.GetTerapeutas().subscribe(
        fu => {
          this.blockUI.stop();
          this.items = fu;
         
          console.log(this.items);
  
        }, error => {
          console.log(error);
          //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
        });
    }

    get filteredItems(): any[] {
        if (!this.items) {
          return []; // Inicializa como un arreglo vacío si this.items es indefinida
        }
        return this.items.filter(item =>
          item.tera_paterno.toLowerCase().includes(this.searchString.toLowerCase()) ||
          item.tera_materno.toLowerCase().includes(this.searchString.toLowerCase()) ||
          item.tera_nombres.toLowerCase().includes(this.searchString.toLowerCase())
        );
      }
  
 /*    get filteredItems(): any[] {
      return this.items.filter(item =>
        item.tera_paterno.toLowerCase().includes(this.searchString.toLowerCase()) ||
        item.tera_materno.toLowerCase().includes(this.searchString.toLowerCase()) ||
        item.tera_nombres.toLowerCase().includes(this.searchString.toLowerCase()) 

      );
    } */
    Limpiar(){
        this.tera.tera_id=null;
        this.tera.tera_paterno=null;
        this.tera.tera_materno=null;
        this.tera.tera_nombres=null;
    }



    Registrar(){
      if(!this.tera.tera_paterno){
        this.blockUI.stop();
        swal.fire('Registro', 'Falta Ingresar Apellido Paterno', 'info');
        return;
      }
      else if(!this.tera.tera_materno){
        this.blockUI.stop();
        swal.fire('Registro', 'Falta Ingresar Apellido Materno', 'info');
        return;
      }
      else if(!this.tera.tera_nombres){
        this.blockUI.stop();
        swal.fire('Registro', 'Falta Ingresar Nombre', 'info');
        return;
      }
      else{
        this.blockUI.start('Registrando...');
        this.terap.GuardarTerapeuta(this.tera).subscribe(
            datos => {
    
              if(datos){
                this.blockUI.stop();
                this.resp=datos;
                swal.fire('Guardando Datos', 'Terapeuta Registrado', 'success');
                this.Limpiar();
                this.ngOnInit();
                this.modalClose.nativeElement.click();
              }
      
            }, error => {
              console.log(error);
              //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
            });
      }
    }


    getTerapeuta(id:number){
        this.terap.GetTerapeuta(id).subscribe(
            fu => {
              this.blockUI.stop();
              this.tera = fu;
             
              console.log(this.tera);
      
            }, error => {
              console.log(error);
              //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
            });
    }
  
    Editar(){
      this.blockUI.start('Actualizando...');
      this.terap.UpdateTerapeuta(this.tera).subscribe(
        datos => {
            console.log(datos);
            this.blockUI.stop();
            swal.fire('Actualizando Datos', 'Terapeuta Actualizado', 'success');
            this.ngOnInit();
            this.modalClose.nativeElement.click();
  
        }, error => {
          console.log(error);
          //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
        });
    }
    Eliminar(id:number){
        this.blockUI.start('Eliminando...');
        this.terap.DeleteTerapeuta(id).subscribe(
          datos => {
              console.log(datos);
              this.blockUI.stop();
              swal.fire('Eliminando Datos', 'Terapeuta Eliminado', 'success');
              this.ngOnInit();
              this.modalClose.nativeElement.click();
    
          }, error => {
            console.log(error);
            //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
          });
    }
      
 /*    Eliminar(id:number){
        this.terap.UpdateEstatus(id).subscribe(
          datos => {
    
            if(datos){
              this.blockUI.stop();
              this.resp=datos;
              swal.fire('Actualizando Datos', `${this.resp.descripcion}`, 'success');
              this.ngOnInit();
              //this.modalClose.nativeElement.click();
            }
    
          }, error => {
            console.log(error);
            //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
          });
      } */
}
