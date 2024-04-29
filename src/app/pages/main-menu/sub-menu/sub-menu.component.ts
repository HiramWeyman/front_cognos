import { Padron } from '@/models/Padron';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from '@services/app.service';
import { PadronService } from '@services/padron.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import swal from 'sweetalert2';
@Component({
  selector: 'app-sub-menu',
  templateUrl: './sub-menu.component.html',
  styleUrls: ['./sub-menu.component.scss']
})
export class SubMenuComponent implements OnInit {
  searchString: string = '';
  pad:Padron =new Padron();
  items: any[];
  resp:any;
  @BlockUI()
  blockUI!: NgBlockUI;
  @ViewChild('myModalClose') modalClose;
  constructor(private padron: PadronService,private appService: AppService,) { }

  ngOnInit(): void {
    this.blockUI.start('Cargando Padrón...');
    this.padron.GetPadron().subscribe(
      fu => {
        this.blockUI.stop();
        this.items = fu;
       
        console.log(this.items);

      }, error => {
        console.log(error);
        //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }

/*   get filteredItems(): any[] {
    return this.items.filter(item =>
      item.pad_nombre.toLowerCase().includes(this.searchString.toLowerCase()) ||
      item.pad_correo.toLowerCase().includes(this.searchString.toLowerCase()) ||
      item.pad_estatus.toLowerCase().includes(this.searchString.toLowerCase()) 

    );
  } */

  get filteredItems(): any[] {
    if (!this.items) {
      return []; // Inicializa como un arreglo vacío si this.items es indefinida
    }
    return this.items.filter(item =>
      item.pad_nombre.toLowerCase().includes(this.searchString.toLowerCase()) ||
      item.pad_correo.toLowerCase().includes(this.searchString.toLowerCase()) ||
      item.pad_estatus.toLowerCase().includes(this.searchString.toLowerCase())
    );
  }

  Registrar(){
    if(!this.pad.pad_nombre){
      this.blockUI.stop();
      swal.fire('Registro', 'Falta Ingresar Nombre', 'info');
      return;
    }
    else if(!this.pad.pad_correo){
      this.blockUI.stop();
      swal.fire('Registro', 'Falta Ingresar Correo', 'info');
      return;
    }
    else{
      this.blockUI.start('Registrando...');
        this.padron.ValidaPadronUsr(this.pad.pad_correo.trim()).subscribe(count=>{
          if(Number(count)==1){
            this.blockUI.stop();
            swal.fire('Registro', 'El correo ya fue registrado', 'info');
          }else{
            
            this.padron.GuardarPadron(this.pad).subscribe(
              datos => {
      
                if(datos){
                  this.blockUI.stop();
                  this.resp=datos;
                  swal.fire('Guardando Datos', `${this.resp.descripcion}`, 'success');
                  this.ngOnInit();
                  this.modalClose.nativeElement.click();
                }
        
              }, error => {
                console.log(error);
                //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
              });
          }
        });
    }
  }

  ActivaDesactiva(id:number){
    this.padron.UpdateEstatus(id).subscribe(
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
  }

}
