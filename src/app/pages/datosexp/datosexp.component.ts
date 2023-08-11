import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import{Tabla1} from '../../models/Tabla1';
import{Tabla2} from '../../models/Tabla2';
import { MatSort, Sort } from '@angular/material/sort';





@Component({
  selector: 'app-datosexp',
  templateUrl: './datosexp.component.html',
  styleUrls: ['./datosexp.component.scss']
})
export class DatosexpComponent {
  id!: any;
  constructor(private route: ActivatedRoute,private paginator: MatPaginatorIntl) {
    this.paginator.itemsPerPageLabel = "Registros por página";
  }

  displayedColumns: string[] = [ 'position','terapeuta', 'fecha', 'documento', 'informe'];

  ELEMENT_DATA1: Tabla1[] =[
    {position: 1, terapeuta: 'Hydrogen', fecha: 1.0079, documento: 'H'},
    {position: 2, terapeuta: 'Helium', fecha: 4.0026, documento: 'He'},
    {position: 3, terapeuta: 'Lithium', fecha: 6.941, documento: 'Li'},
    {position: 4, terapeuta: 'Beryllium', fecha: 9.0122, documento: 'Be'},
    {position: 5, terapeuta: 'Boron', fecha: 10.811, documento: 'B'},
    {position: 6, terapeuta: 'Carbon', fecha: 12.0107, documento: 'C'},
    {position: 7, terapeuta: 'Nitrogen', fecha: 14.0067, documento: 'N'},
    {position: 8, terapeuta: 'Oxygen', fecha: 15.9994, documento: 'O'},
    {position: 9, terapeuta: 'Fluorine', fecha: 18.9984, documento: 'F'},
    {position: 10, terapeuta: 'Neon', fecha: 20.1797, documento: 'Ne'},
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


  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
  }





 
}
