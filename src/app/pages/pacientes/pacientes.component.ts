import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { PacientesService } from '@services/pacientes.service';
import { Pacientes } from '@/models/Pacientes';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

export interface PeriodicElement {
  pac_id: number;
  pac_nombre: string;
  telefono: number;
  fecha: string;
}
/* 
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, nombre: 'Estefania Pellegrini Saneti', telefono:6181609874, fecha: '10/11/2022'},
  {position: 2, nombre: 'Marcela Chairez Maa', telefono:6181552074, fecha: '20/06/2023'},
  {position: 3, nombre: 'Mikaela hernadez flores', telefono:6182559475, fecha: '15/03/2021'},
  {position: 4, nombre: 'Juan Pedro Dominguez Campos', telefono:6181334596, fecha: '07/12/2022'},
  {position: 5, nombre: 'Paola Aguilar Morales', telefono:6181676259, fecha: '14/10/2023'},
  {position: 6, nombre: 'Jose Luis Almanza Herrera', telefono:6182335689, fecha: '25/01/2023'},
  {position: 7, nombre: 'Alma Gabriela Aguirre Soria', telefono:6184559687, fecha: '16/02/2020'},
  {position: 8, nombre: 'Angel Alvarez Flores', telefono:6182657489, fecha: '09/05/2021'},
  {position: 9, nombre: 'Rosalio Alvarez Lemus', telefono:6183364596, fecha: '05/07/2022'},
  {position: 10, nombre: 'Lilia Alvarez Santillan', telefono:6182995687, fecha: '04/08/2023'},

]; */

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.scss'],
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule,MatFormFieldModule, MatInputModule,MatButtonModule,RouterModule,MatIconModule],
})
export class PacientesComponent implements OnInit {
  pacientes: Pacientes[];
  fec:any;
  constructor(private router: Router,private paginator: MatPaginatorIntl, private _pac: PacientesService, private datePipe: DatePipe) {
    this.paginator.itemsPerPageLabel = "Registros por página";
  }
  ngOnInit(): void {
    this.cargarPacientes();
  }
  displayedColumns: string[] = ['pac_id', 'pac_nombre', 'pac_telefono', 'pac_fecha_ingreso','expediente'];
/*   dataSource = ELEMENT_DATA; */
 /*  dataSource = new MatTableDataSource<Pacientes>(this.pacientes); */
 dataSource;
  @ViewChild('paginatorFirst') paginatorFirst: MatPaginator;
/*   @ViewChild(MatPaginator)
  paginator1!: MatPaginator; */
  

 /*  ngAfterViewInit() {
    this.dataSource.paginator = this.paginatorFirst;

  } */

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  cargarPacientes() {
    this._pac.GetPacientes().subscribe(
      pac => {
      
        this.pacientes = pac;
        console.log(this.pacientes);
        for(let i=0;i<this.pacientes.length;i++){
          this.fec =this.datePipe.transform(this.pacientes[i].pac_fecha_ingreso,"dd/MM/yyyy");
          this.pacientes[i].pac_fecha_ingreso= this.fec;
        }
        console.log(this.pacientes);
        this.dataSource = new MatTableDataSource(this.pacientes);
        /*  this.dataSource.paginator = this.paginator; */
         this.dataSource.paginator = this.paginatorFirst;
      }, error => {
        //console.log(error);
        Swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }
}

