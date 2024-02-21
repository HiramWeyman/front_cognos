import { Component, Input, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import{Tabla1} from '../../models/Tabla1';
import{Tabla2} from '../../models/Tabla2';
import { MatSort, Sort } from '@angular/material/sort';
import { PacientesService } from '@services/pacientes.service';
import { Pacientes } from '@/models/Pacientes';
import { Subscription } from 'rxjs';
import swal from 'sweetalert2';
import { MatTabGroup } from '@angular/material/tabs';
import { SharednumberService } from '@services/sharednumber.service';




@Component({
  selector: 'app-datosexp',
  templateUrl: './datosexp.component.html',
  styleUrls: ['./datosexp.component.scss']
})
export class DatosexpComponent {
  id!: any;
  expediente!: any;
  nombre!: any;
  perfil:any;
  pac: Pacientes = new Pacientes();
  constructor(private route: ActivatedRoute, private _pac: PacientesService,private sharednumber:SharednumberService) {

  }

/*  */
  @ViewChild('tabRef') tabGroup: MatTabGroup;
  @Input() selectedIndex = 0; 
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    sessionStorage.setItem('Expediente', this.id);
    this.expediente=sessionStorage.getItem('Expediente');
    this.perfil=sessionStorage.getItem('UserPerfil');
    console.log(sessionStorage.getItem('Expediente'));
    this.cargarPacientes();
    const val:number=Number(sessionStorage.getItem('IndexTab'));
    console.log('index: '+val);
    this.selectedIndex=val;
    sessionStorage.setItem('IndexTabla',this.selectedIndex.toString());
 /*    console.log(this.tabGroup.selectedIndex);
    this.tabGroup.selectedIndex; */
  }



  cargarPacientes() {
    this._pac.GetPaciente( this.id ).subscribe(
      pac => {
        this.pac = pac;
        //console.log(this.pac);
        this.nombre=this.pac.pac_paterno+' '+this.pac.pac_materno+' '+this.pac.pac_nombre;
      }, error => {
        //console.log(error);
        swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }




  ngAfterViewInit() {
    // doesn't work if outside setTimeOut()
    setTimeout(() => {
      console.log(this.tabGroup.selectedIndex);
      this.tabGroup.selectedIndex = this.selectedIndex;
      this.tabGroup.realignInkBar(); // re-align the bottom border of the tab
    })
  }

  changeSelect(index:number){
    console.log(index);
    const valor:any=index;
    sessionStorage.setItem('IndexTab', valor);
    const val:number=Number(sessionStorage.getItem('IndexTab'));
    this.tabGroup.selectedIndex=val;
    console.log(this.tabGroup.selectedIndex);
    this.sharednumber.updateNumero(index.toString());
  }
 
}
