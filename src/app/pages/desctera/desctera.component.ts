import { Component } from '@angular/core';
import { Archivo, ArchivosService } from '@services/archivos.service';

@Component({
  selector: 'app-desctera',
  templateUrl: './desctera.component.html',
  styleUrls: ['./desctera.component.scss']
})
export class DescteraComponent {
  archivos: Archivo[] = [];
  fileToUpload: File | null = null;
  descripcion: string = '';
  perfil: any;
  categoria:any;

  constructor(private archivosService: ArchivosService) { }

  ngOnInit(): void {
    this.perfil = localStorage.getItem('UserPerfil');
    this.cargarArchivos(1);
  }

  cargarArchivos(cat:number) {
    //console.log(cat);
    this.categoria=cat;
    this.archivosService.listar(cat).subscribe(data => {
      this.archivos = data;
    });
  }

  onFileSelected(event: any) {
    this.fileToUpload = event.target.files[0];
  }

  subirArchivo() {
    if (!this.fileToUpload) {
      alert('Selecciona un archivo primero');
      return;
    }

    else if (!this.descripcion) {
      alert('Agrega una descripción');
      return;
    }

    this.archivosService.subir(this.fileToUpload, this.descripcion,this.categoria).subscribe(() => {
      console.log('Categoria: '+this.categoria);
      alert('Archivo subido correctamente');
      this.fileToUpload = null;
      this.descripcion = '';
      this.cargarArchivos(Number(this.categoria));
    });
  }



  abrirArchivo(id: number) {
  this.archivosService.descargar(id).subscribe(resp => {
    console.log(resp);
    if (resp.url) {
      window.open(resp.url, '_blank'); // abre en nueva pestaña
    }
  });
}

  eliminarArchivo(id: number) {
    if (confirm('¿Seguro que deseas eliminar este archivo?')) {
      this.archivosService.eliminar(id).subscribe(() => {
        alert('Archivo eliminado ');
        this.cargarArchivos(Number(this.categoria));
      });
    }
  }

  onTabChange(event: any) {
  const index = event.index; // índice de la tab seleccionada (0,1,2,...)


  switch (index) {
    case 0: this.categoria = 1; break; // Infanto juvenil
    case 1: this.categoria = 2; break; // Adultos
    case 2: this.categoria = 3; break; // Parejas
    case 3: this.categoria = 4; break; // Neurociencias
    case 4: this.categoria = 5; break; // Varios
  }

  this.cargarArchivos(this.categoria);
}

}
