import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
import { AppService } from '@services/app.service';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-reasignapac',
  templateUrl: './reasignapac.component.html',
  styleUrls: ['./reasignapac.component.scss'],
  standalone: true,
  imports: [
    MatTableModule, 
    MatPaginatorModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    RouterModule, 
    MatIconModule, 
    FormsModule, // <-- Agregar FormsModule aquí
    CommonModule
  ],
})
export class ReasignapacComponent {
  pacientes: Pacientes[];
  terapeurtas: any[];
  fec:any;
  perfil:any;
  usuario_id:any;
  selectedAutor: string = '';
  selectedColaborador: string = '';
  selectedRecord: any; // Registro seleccionado
  @BlockUI()
  blockUI!: NgBlockUI;
  @ViewChild('closeModalButton') closeModalButton!: ElementRef<HTMLButtonElement>;
  constructor(private router: Router,private paginator: MatPaginatorIntl, private _pac: PacientesService, private datePipe: DatePipe,private appService: AppService) {
    this.paginator.itemsPerPageLabel = "Registros por página";
  }

    ngOnInit(): void {

      this.perfil=localStorage.getItem('UserPerfil');
      this.usuario_id=localStorage.getItem('UserId');
      console.log(this.perfil);
      this.cargarPacientes();
      this.cargarTerapeutas();
       
      console.log(this.usuario_id);
     
    }
    displayedColumns: string[] = ['pac_id', 'pac_nombre', 'pac_telefono', 'pac_fecha_ingreso','expediente'];

   dataSource;
    @ViewChild('paginatorFirst') paginatorFirst: MatPaginator;

  
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }

     // Lógica para abrir el modal
  openModal(record: any): void {
    this.selectedRecord = record; // Guardamos el registro seleccionado
    console.log('Registro seleccionado:', this.selectedRecord);
  }

  actualizarExpediente(): void {
    if (!this.selectedRecord) {
      alert('No se seleccionó un expediente válido.');
      return;
    }
    this.blockUI.start('Actualizando Datos...');
    const id = this.selectedRecord;
    const autorId = parseInt(this.selectedAutor); // Obtén estos valores desde el formulario/modal
    const colaboradorId =  parseInt(this.selectedColaborador);
    
    this._pac.actualizarPaciente(id, autorId, colaboradorId).subscribe({
      next: (response) => {
        console.log(response);
        this.blockUI.stop();
        Swal.fire('Actualizando Datos', `${response.descripcion}`, 'success').then(() => {
          // Emula clic en el botón de cerrar modal
          this.closeModalButton.nativeElement.click();

          // Reinicia las variables
          this.selectedAutor = '';
          this.selectedColaborador = '';
          this.selectedRecord = null;
        });
        /* alert(response.Descripcion); */
      },
      error: (err) => {
        console.error('Error al actualizar el expediente', err);
        alert('Ocurrió un error al actualizar el expediente.');
      }
    });
  }
  
    cargarPacientes() {
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
        }, error => {
          //console.log(error);
          Swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
        });
    }

    cargarTerapeutas() {
      this._pac.GetTerapuetasReasignar().subscribe(
        tera => {
        
          this.terapeurtas = tera;
           console.log(this.terapeurtas);
       
        }, error => {
          //console.log(error);
          Swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
        });
    }
}
