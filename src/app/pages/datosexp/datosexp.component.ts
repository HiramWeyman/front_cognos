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




@Component({
  selector: 'app-datosexp',
  templateUrl: './datosexp.component.html',
  styleUrls: ['./datosexp.component.scss']
})
export class DatosexpComponent {
  id!: any;
  expediente!: any;
  nombre!: any;
  pac: Pacientes = new Pacientes();
  constructor(private route: ActivatedRoute,private paginator: MatPaginatorIntl, private _pac: PacientesService) {
    this.paginator.itemsPerPageLabel = "Registros por página";
  }

  displayedColumns: string[] = [ 'position','terapeuta', 'fecha', 'coterapeuta', 'informe'];

  ELEMENT_DATA1: Tabla1[] =[
    {position: 1, terapeuta: 'Leonel Oliverio Linares', fecha: '12/01/2021', coterapeuta: 'Angel San'},
    {position: 2, terapeuta: 'Leonel Oliverio Linares', fecha: '15/02/2021', coterapeuta: 'Angel San'},
    {position: 3, terapeuta: 'Leonel Oliverio Linares', fecha: '12/03/2021', coterapeuta: 'Angel San'},
    {position: 4, terapeuta: 'Leonel Oliverio Linares', fecha: '15/04/2021', coterapeuta: 'Angel San'},
    {position: 5, terapeuta: 'Leonel Oliverio Linares', fecha: '12/05/2021', coterapeuta: 'Angel San'},
    {position: 6, terapeuta: 'Leonel Oliverio Linares', fecha: '15/06/2021', coterapeuta: 'Angel San'},
    {position: 7, terapeuta: 'Leonel Oliverio Linares', fecha: '12/07/2021', coterapeuta: 'Angel San'},
    {position: 8, terapeuta: 'Leonel Oliverio Linares', fecha: '15/08/2021', coterapeuta: 'Angel San'},
    {position: 9, terapeuta: 'Leonel Oliverio Linares', fecha: '12/09/2021', coterapeuta: 'Angel San'},
    {position: 10, terapeuta: 'Leonel Oliverio Linares', fecha: '15/10/2021', coterapeuta: 'Angel San'},
  ];

 
  
  dataSource = new MatTableDataSource(this.ELEMENT_DATA1);

/*   dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  dataSource2 = new MatTableDataSource<PeriodicElement2>(ELEMENT_DATA2); */
/*   clickedRows = new Set<PeriodicElement>(); */
/*   @ViewChild(MatPaginator) */
  
/*   paginator!: MatPaginator;
  paginator2!: MatPaginator; */
/*   @ViewChild('empTbSort') empTbSort = new MatSort();
  @ViewChild('empTbSortWithObject') empTbSortWithObject = new MatSort(); */

  @ViewChild('paginatorFirst') paginatorFirst: MatPaginator;
  @ViewChild('tabRef') tabGroup: MatTabGroup;
  @Input() selectedIndex = 0; 
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    sessionStorage.setItem('Expediente', this.id);
    this.expediente=sessionStorage.getItem('Expediente');
    console.log(sessionStorage.getItem('Expediente'));
    this.cargarPacientes();
    const val:number=Number(sessionStorage.getItem('IndexTab'));
    console.log('index: '+val);
    this.selectedIndex=val;
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
  }
 
}
