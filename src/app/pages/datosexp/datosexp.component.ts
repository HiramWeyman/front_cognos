import { Component, Input, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import{Tabla1} from '../../models/Tabla1';
import{Tabla2} from '../../models/Tabla2';
import { MatSort, Sort } from '@angular/material/sort';
import { PacientesService } from '@services/pacientes.service';
import { Pacientes } from '@/models/Pacientes';
import { Subscription } from 'rxjs';
import swal from 'sweetalert2';
import { MatTabGroup } from '@angular/material/tabs';
import { SharednumberService } from '@services/sharednumber.service';
import { AppService } from '@services/app.service';




@Component({
  selector: 'app-datosexp',
  templateUrl: './datosexp.component.html',
  styleUrls: ['./datosexp.component.scss']
})
export class DatosexpComponent {
  id!: any;
  expediente!: any;
  nombrePaciente!: any;
  perfil:any;
  pac: Pacientes = new Pacientes();
  constructor(private route: ActivatedRoute, private _pac: PacientesService,private sharednumber:SharednumberService,private appService: AppService,private router: Router) {

  }

/*  */
  @ViewChild('tabRef') tabGroup: MatTabGroup;
  @Input() selectedIndex = 0; 
  ngOnInit(): void {
 
    localStorage.removeItem('llaveFam');
    this.id = this.route.snapshot.paramMap.get('id');
    localStorage.setItem('Expediente', this.id);
    this.expediente=localStorage.getItem('Expediente');
    this.perfil=localStorage.getItem('UserPerfil');
    console.log(localStorage.getItem('Expediente'));
    this.cargarPacientes();
    const val:number=Number(localStorage.getItem('IndexTab'));
    console.log('index: '+val);
    this.selectedIndex=val;
    localStorage.setItem('IndexTabla',this.selectedIndex.toString());
 /*    console.log(this.tabGroup.selectedIndex);
    this.tabGroup.selectedIndex; */
  }



  cargarPacientes() {
    this._pac.GetPaciente( this.id ).subscribe(
      pac => {
        this.pac = pac;
        //console.log(this.pac);
        this.nombrePaciente=this.pac.pac_paterno+' '+this.pac.pac_materno+' '+this.pac.pac_nombre;
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
    localStorage.setItem('IndexTab', valor);
    const val:number=Number(localStorage.getItem('IndexTab'));
    this.tabGroup.selectedIndex=val;
    console.log(this.tabGroup.selectedIndex);
    this.sharednumber.updateNumero(index.toString());
  }
 
}
