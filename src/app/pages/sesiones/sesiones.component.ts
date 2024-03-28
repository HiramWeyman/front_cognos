import { Sesion } from '@/models/Sesion';
import { Tabla2 } from '@/models/Tabla2';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { SesionService } from '@services/sesiones.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { SharednumberService } from '@services/sharednumber.service';

@Component({
  selector: 'app-sesiones',
  templateUrl: './sesiones.component.html',
  styleUrls: ['./sesiones.component.scss']
})

export class SesionesComponent implements OnInit{
  sesiones: Sesion[];
  fec:any;
  expediente!: any;
  Sessiontab!: any;
  Indextab:any;
  constructor(private route: ActivatedRoute, private paginator: MatPaginatorIntl,private _se:SesionService,private datePipe: DatePipe,private sharednumber:SharednumberService) {
    this.paginator.itemsPerPageLabel = "Registros por página";
  }
  ngOnInit(): void {
    this.expediente=sessionStorage.getItem('Expediente');
    this.Sessiontab=sessionStorage.getItem('IndexTab');
    this.sharednumber.numero$.subscribe(val=>
      {
        this.Indextab=val;
        if(this.Indextab==13||this.Sessiontab==13){
          this.cargarSesiones();
        }
      });
    
   
  }

  displayedColumns: string[] = ['sesion_fecha_captura', 'sesion_no', 'sesion_objetivo','sesion_tarea_asignada','reporte','acciones'];

  dataSource;
  @ViewChild('paginatorFirst') paginatorFirst: MatPaginator;

  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  cargarSesiones() {
    this._se.GetSesionList(this.expediente).subscribe(
      se => {
      
        this.sesiones = se;
        console.log(this.sesiones);
        for(let i=0;i<this.sesiones.length;i++){
          this.fec =this.datePipe.transform(this.sesiones[i].sesion_fecha,"dd/MM/yyyy");
          this.sesiones[i].sesion_fecha= this.fec;
        }
        console.log(this.sesiones);
        this.dataSource = new MatTableDataSource(this.sesiones);
        /*  this.dataSource.paginator = this.paginator; */
         this.dataSource.paginator = this.paginatorFirst;
      }, error => {
        //console.log(error);
        Swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }

  DeleteDatosSesion(id:number): void {
    this._se.DelSesion(id).subscribe(dp => {
      
        Swal.fire('Borrando Sesión', `Sesión Eliminada!`, 'success');
        this.ngOnInit();
    
    },error => {
      console.log(error);
      //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
    });
  }

  getNotas(){
    window.open('assets/files/Notas_terapia.pdf');
  }

}
