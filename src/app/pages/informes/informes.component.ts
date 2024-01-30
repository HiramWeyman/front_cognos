import { Informe } from '@/models/Informe';
import { Pacientes } from '@/models/Pacientes';
import { Tabla1 } from '@/models/Tabla1';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { InformeService } from '@services/informe.service';
import { PacientesService } from '@services/pacientes.service';
import { SharednumberService } from '@services/sharednumber.service';
import swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.scss']
})
export class InformesComponent implements OnInit  {

  ExpedienteId!: any;
  Sessiontab!: any;
  UsuarioId: any;
  UsuarioNombre: any;
  Indextab:any;
  pac: Pacientes = new Pacientes();
  inf: Informe = new Informe();
  informes: Informe[];
  fec_ing:any;
  fec_u_mov:any;
  
  constructor(
    private route: ActivatedRoute,
    private paginator: MatPaginatorIntl,
    private sharednumber:SharednumberService,
    private _pac: PacientesService,
    private _inf:InformeService,
    private datePipe: DatePipe
    ) {
    this.paginator.itemsPerPageLabel = "Registros por página";
  }
  ngOnInit(): void {
    this.ExpedienteId=sessionStorage.getItem('Expediente');
    this.Sessiontab=sessionStorage.getItem('IndexTab');
    this.UsuarioId=sessionStorage.getItem('UserId');
    this.UsuarioNombre=sessionStorage.getItem('UserName');
    console.log('Id del expediente '+this.ExpedienteId);
    console.log(this.ExpedienteId);
    this.sharednumber.numero$.subscribe(val=>
      {
        this.Indextab=val;
        if(this.Indextab==14||this.Sessiontab==14){
          this.cargarPacientes();
          this.cargarInformes();
        }
      });
    
  }

   displayedColumns: string[] = ['position','inf_nombre', 'inf_fecha_ingreso', 'inf_ultimo_mov', 'informe'];

   dataSource: MatTableDataSource<Informe> = new MatTableDataSource();
  @ViewChild('paginatorFirst') paginatorFirst: MatPaginator;
 

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  cargarPacientes() {
    this._pac.GetPaciente(this.ExpedienteId).subscribe(
      pac => {
        this.pac = pac;
        console.log(this.pac);
       
      }, error => {
        //console.log(error);
        swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }


  cargarInformes() {
    this._inf.GetInformeList(this.ExpedienteId).subscribe(
      se => {
      
        this.informes = se;
        console.log(this.informes);
        for(let i=0;i<this.informes.length;i++){
          this.fec_ing =this.datePipe.transform(this.informes[i].inf_fecha_ingreso,"dd/MM/yyyy");
          this.informes[i].inf_fecha_ingreso= this.fec_ing;

          this.fec_u_mov =this.datePipe.transform(this.informes[i].inf_ultimo_mov,"dd/MM/yyyy h:m:s a");
          this.informes[i].inf_ultimo_mov= this.fec_u_mov;
        }
        console.log(this.informes);
        this.dataSource = new MatTableDataSource(this.informes);
        /*  this.dataSource.paginator = this.paginator; */
         this.dataSource.paginator = this.paginatorFirst;
      }, error => {
        //console.log(error);
        Swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginatorFirst;
  }
  Guardar(){
  

    this.inf.inf_paterno=this.pac.pac_paterno;
    this.inf.inf_materno=this.pac.pac_materno;
    this.inf.inf_nombre=this.pac.pac_nombre;
    this.inf.inf_fecha_nacimiento=this.pac.pac_fecha_nacimiento;
    this.inf.inf_fecha_ingreso=this.pac.pac_fecha_ingreso;
    this.inf.inf_edad=this.pac.pac_edad;
    this.inf.inf_genero=this.pac.pac_genero;
    this.inf.inf_edocivil=this.pac.pac_edocivil;
    this.inf.inf_estructura_fam=this.pac.pac_estructura_fam;
    this.inf.inf_email=this.pac.pac_email;
    this.inf.inf_escolaridad=this.pac.pac_escolaridad;
    this.inf.inf_ocupacion=this.pac.pac_ocupacion;
    this.inf.inf_telefono=this.pac.pac_telefono;
    this.inf.inf_domicilio=this.pac.pac_domicilio;
    this.inf.inf_tutor=this.pac.pac_tutor;
    this.inf.inf_terapeuta=this.pac.pac_terapeuta;
    this.inf.inf_coterapeuta=this.pac.pac_coterapeuta;
    this.inf.inf_paciente_id=Number(this.ExpedienteId);

 
   
    this._inf.RegistroInforme(this.inf).subscribe(datos => {
      
      if(datos){
        swal.fire('Guardando Datos', `Datos Guardados Exitosamente!`, 'success');
      }
      this.ngOnInit();

    },error => {
      console.log(error);
      //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
    });
  }
}
