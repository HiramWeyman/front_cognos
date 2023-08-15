import { Tabla2 } from '@/models/Tabla2';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sesiones',
  templateUrl: './sesiones.component.html',
  styleUrls: ['./sesiones.component.scss']
})

export class SesionesComponent {
  constructor(private route: ActivatedRoute, private paginator: MatPaginatorIntl) {
    this.paginator.itemsPerPageLabel = "Registros por página";
  }

  displayedColumns2: string[] = ['fecha', 'sesion', 'coterapeuta', 'reporte'];
  ELEMENT_DATA2: Tabla2[] = [
    { fecha: '12/02/2023', sesion: 1, coterapeuta: 'Angel S - Juan' },
    { fecha: '20/02/2023', sesion: 2, coterapeuta: 'Angel S - Juan' },
    { fecha: '06/03/2023', sesion: 3, coterapeuta: 'Angel S - Juan' },
    { fecha: '15/03/2023', sesion: 4, coterapeuta: 'Angel S - Juan' },
    { fecha: '23/03/2023', sesion: 5, coterapeuta: 'Angel S - Juan' },
    { fecha: '29/03/2023', sesion: 6, coterapeuta: 'Angel S - Juan' },
    { fecha: '12/04/2023', sesion: 7, coterapeuta: 'Angel S - Juan' },
    { fecha: '26/04/2023', sesion: 8, coterapeuta: 'Angel S - Juan' },
    { fecha: '03/05/2023', sesion: 9, coterapeuta: 'Angel S - Juan' },
    { fecha: '17/05/2023', sesion: 10, coterapeuta: 'Angel S - Juan' },
    { fecha: '24/05/2023', sesion: 11, coterapeuta: 'Angel S - Juan' },

  ];
  dataSource2 = new MatTableDataSource(this.ELEMENT_DATA2);
  @ViewChild('paginatorSecond') paginatorSecond: MatPaginator;

  ngAfterViewInit() {
    this.dataSource2.paginator = this.paginatorSecond;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource2.filter = filterValue.trim().toLowerCase();
  }

  getNotas(){
    window.open('assets/files/Notas_terapia.pdf');
  }

}
