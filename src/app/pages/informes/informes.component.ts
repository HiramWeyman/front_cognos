import { Informe } from '@/models/Informe';
import { Pacientes } from '@/models/Pacientes';
import { Tabla1 } from '@/models/Tabla1';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { InformeService } from '@services/informe.service';
import { PacientesService } from '@services/pacientes.service';
import { SharednumberService } from '@services/sharednumber.service';
import swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { AppService } from '@services/app.service';

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
    private datePipe: DatePipe,
    private appService: AppService,
    private router: Router,
    ) {
    this.paginator.itemsPerPageLabel = "Registros por página";
  }
  ngOnInit(): void {
  
    this.ExpedienteId=localStorage.getItem('Expediente');
    this.Sessiontab=localStorage.getItem('IndexTab');
    this.UsuarioId=localStorage.getItem('UserId');
    this.UsuarioNombre=localStorage.getItem('UserName');
    console.log('Id del expediente '+this.ExpedienteId);
    console.log(this.ExpedienteId);
    this.sharednumber.numero$.subscribe(val=>
      {
        this.Indextab=val;
        if(this.Indextab==13||this.Sessiontab==13){
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
    console.log(this.ExpedienteId);
    this._inf.GetInformeList(Number(this.ExpedienteId)).subscribe(
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

    this.inf.inf_especifique=this.pac.pac_especifique;
    this.inf.inf_contacto_eme=this.pac.pac_contacto_eme;
    this.inf.inf_telefono_eme=this.pac.pac_telefono_eme;
    this.inf.inf_contacto_eme2=this.pac.pac_contacto_eme2;
    this.inf.inf_telefono_eme2=this.pac.pac_telefono_eme2;
    this.inf.inf_contacto_eme3=this.pac.pac_contacto_eme3;
    this.inf.inf_telefono_eme3=this.pac.pac_telefono_eme3;
    this.inf.inf_orientacion=this.pac.pac_orientacion;
    this.inf.inf_especifique_or=this.pac.pac_especifique_or
    this.inf.inf_pareja=this.pac.pac_pareja;
    this.inf.inf_religion=this.pac.pac_religion;
    this.inf.inf_especifique_reg=this.pac.pac_especifique_reg;
    this.inf.inf_trabaja=this.pac.pac_trabaja;
    this.inf.inf_lugar_trabajo=this.pac.pac_lugar_trabajo;
    this.inf.inf_horas_semana=this.pac.pac_horas_semana;
    this.inf.inf_vive_con=this.pac.pac_vive_con;

    this.inf.inf_idea_su=this.pac.pac_idea_su;
    this.inf.inf_idea_su_tiempo=this.pac.pac_idea_su_tiempo;

    this.inf.inf_intento_su=this.pac.pac_intento_su;
    this.inf.inf_intento_su_tiempo=this.pac.pac_intento_su_tiempo;
    this.inf.inf_intento_su_metodo=this.pac.pac_intento_su_metodo;
    this.inf.inf_intento_su_especifique=this.pac.pac_intento_su_especifique;

    this.inf.inf_plan_su=this.pac.pac_plan_su;
    this.inf.inf_plan_su_tiempo=this.pac.pac_plan_su_tiempo;
    this.inf.inf_plan_su_metodo=this.pac.pac_plan_su_metodo;
    this.inf.inf_plan_su_especifique=this.pac.pac_plan_su_especifique;
    this.inf.inf_plan_su_nivel=this.pac.pac_plan_su_nivel;

    this.inf.inf_autolesion=this.pac.pac_autolesion;
    this.inf.inf_autolesion_tiempo=this.pac.pac_autolesion_tiempo;
    this.inf.inf_autolesion_metodo=this.pac.pac_autolesion_metodo;
    this.inf.inf_autolesion_especifique=this.pac.pac_autolesion_especifique;
    this.inf.inf_autolesion_lugar=this.pac.pac_autolesion_lugar;
    this.inf.inf_autolesion_lu_espe=this.pac.pac_autolesion_lu_espe;
    this.inf.inf_llave_fam=this.pac.pac_llave_fam;
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
