import { Maestro } from '@/models/Maestro';
import { MaestroCambio } from '@/models/MaestroCambio';
import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '@services/app.service';
import { ResultadosService } from '@services/resultados.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-res-cree',
  templateUrl: './res-cree.component.html',
  styleUrls: ['./res-cree.component.scss']
})

export class ResCreeComponent {
  
  id!: any;
  resultados: MaestroCambio[];
  selectedItems: MaestroCambio[] = []; 
  total!:any;
  fecMaestro:any;
  expediente!: any;
respuesta!:any;


  constructor(private route: ActivatedRoute, private _res: ResultadosService,private datePipe: DatePipe,private appService: AppService,private router: Router) {

  }
  ngOnInit(): void {
  
    this.expediente=localStorage.getItem('Expediente');
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    this.cargarMaestroResCREE();
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

  AplicarRes(maestro_id:number){
     console.log(maestro_id);
  }
}
