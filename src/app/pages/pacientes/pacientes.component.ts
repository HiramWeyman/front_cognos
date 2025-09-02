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
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { DatePipe } from '@angular/common';
import { AppService } from '@services/app.service';
import { BlockUIModule } from 'ng-block-ui';

export interface PeriodicElement {
  pac_id: number;
  pac_nombre: string;
  telefono: number;
  fecha: string;
}


@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.scss'],
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule,MatFormFieldModule, MatInputModule,MatButtonModule,RouterModule,MatIconModule, BlockUIModule],
})
export class PacientesComponent implements OnInit {
  pacientes: Pacientes[];
  fec:any;
  perfil:any;
  usuario_id:any;
  displayedColumns: any;
  @BlockUI()
  blockUI!: NgBlockUI;
  constructor(private router: Router,private paginator: MatPaginatorIntl, private _pac: PacientesService, private datePipe: DatePipe,private appService: AppService) {
    this.paginator.itemsPerPageLabel = "Registros por página";
  }
  ngOnInit(): void {
    localStorage.removeItem('llaveFam');
    sessionStorage.removeItem('llaveFam');
    localStorage.removeItem('Expediente');
    this.perfil=localStorage.getItem('UserPerfil');
    this.usuario_id=localStorage.getItem('UserId');

    this.displayedColumns = ['pac_id', 'pac_nombre', 'pac_telefono', 'pac_fecha_ingreso','expediente'];

    // Si es admin, agregar columna Acciones
    if (this.perfil == 1) {
      this.displayedColumns.push('acciones');
    }


    console.log(this.perfil);
    if(this.perfil==1){
      this.cargarPacientes();
    }
     else if(this.perfil==2){
      this.cargarPacientesR1();
    }
    else if(this.perfil==3){
      this.cargarPacientesR2();
    }
    else if(this.perfil==4){
      this.cargarPacientesTutor();
    }
    else if(this.perfil==5){
      this.cargarPacientesTerapeuta();
    }
    console.log(this.usuario_id);
   
  }
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
    this.blockUI.start('Cargando pacientes ...');
    this._pac.GetPacientes().subscribe(
      pac => {
      
        this.pacientes = pac;
      /*   console.log(this.pacientes); */
        for(let i=0;i<this.pacientes.length;i++){
          this.fec =this.datePipe.transform(this.pacientes[i].pac_fecha_ingreso,"dd/MM/yyyy");
          this.pacientes[i].pac_fecha_ingreso= this.fec;
        }
      /*   console.log(this.pacientes); */
        this.dataSource = new MatTableDataSource(this.pacientes);
        /*  this.dataSource.paginator = this.paginator; */
         this.dataSource.paginator = this.paginatorFirst;
         this.blockUI.stop(); // <-- Aquí sí
      }, error => {
        //console.log(error);
        Swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }

  cargarPacientesR1() {
    this.blockUI.start('Cargando pacientes ...');
    this._pac.GetPacientesR1(this.usuario_id).subscribe(
      pac => {
      
        this.pacientes = pac;
      /*   console.log(this.pacientes); */
        for(let i=0;i<this.pacientes.length;i++){
          this.fec =this.datePipe.transform(this.pacientes[i].pac_fecha_ingreso,"dd/MM/yyyy");
          this.pacientes[i].pac_fecha_ingreso= this.fec;
        }
      /*   console.log(this.pacientes); */
        this.dataSource = new MatTableDataSource(this.pacientes);
        /*  this.dataSource.paginator = this.paginator; */
         this.dataSource.paginator = this.paginatorFirst;
         this.blockUI.stop(); // <-- Aquí sí
      }, error => {
        //console.log(error);
        Swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }

  cargarPacientesR2() {
    this.blockUI.start('Cargando pacientes ...');
    this._pac.GetPacientesR2(this.usuario_id).subscribe(
      pac => {
      
        this.pacientes = pac;
      /*   console.log(this.pacientes); */
        for(let i=0;i<this.pacientes.length;i++){
          this.fec =this.datePipe.transform(this.pacientes[i].pac_fecha_ingreso,"dd/MM/yyyy");
          this.pacientes[i].pac_fecha_ingreso= this.fec;
        }
      /*   console.log(this.pacientes); */
        this.dataSource = new MatTableDataSource(this.pacientes);
        /*  this.dataSource.paginator = this.paginator; */
         this.dataSource.paginator = this.paginatorFirst;
         this.blockUI.stop(); // <-- Aquí sí
      }, error => {
        //console.log(error);
        Swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }
  

  cargarPacientesTutor() {
    this.blockUI.start('Cargando pacientes ...');
    this._pac.GetPacientesTutor(this.usuario_id).subscribe(
      pac => {
      
        this.pacientes = pac;
      /*   console.log(this.pacientes); */
        for(let i=0;i<this.pacientes.length;i++){
          this.fec =this.datePipe.transform(this.pacientes[i].pac_fecha_ingreso,"dd/MM/yyyy");
          this.pacientes[i].pac_fecha_ingreso= this.fec;
        }
      /*   console.log(this.pacientes); */
        this.dataSource = new MatTableDataSource(this.pacientes);
        /*  this.dataSource.paginator = this.paginator; */
         this.dataSource.paginator = this.paginatorFirst;
         this.blockUI.stop(); // <-- Aquí sí
      }, error => {
        //console.log(error);
        Swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }


  cargarPacientesTerapeuta() {
    this.blockUI.start('Cargando pacientes ...');
    this._pac.GetPacientesTerapeuta(this.usuario_id).subscribe(
      pac => {
      
        this.pacientes = pac;
      /*   console.log(this.pacientes); */
        for(let i=0;i<this.pacientes.length;i++){
          this.fec =this.datePipe.transform(this.pacientes[i].pac_fecha_ingreso,"dd/MM/yyyy");
          this.pacientes[i].pac_fecha_ingreso= this.fec;
        }
      /*   console.log(this.pacientes); */
        this.dataSource = new MatTableDataSource(this.pacientes);
        /*  this.dataSource.paginator = this.paginator; */
         this.dataSource.paginator = this.paginatorFirst;
         this.blockUI.stop(); // <-- Aquí sí
      }, error => {
        //console.log(error);
        Swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }

}

