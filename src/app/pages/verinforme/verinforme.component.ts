import { AnalisisFU } from '@/models/AnalisisFU';
import { Consulta } from '@/models/Consulta';
import { Consumo } from '@/models/Consumo';
import { Diagnostico } from '@/models/Diagnostico';
import { Evolucion } from '@/models/Evolucion';
import { FormCaso } from '@/models/FormCaso';
import { Informe } from '@/models/Informe';
import { InformeVista } from '@/models/InformeVista';
import { LineaVida } from '@/models/LineaVida';
import { Otras } from '@/models/Otras';
import { Previo } from '@/models/Previo';
import { ProbMed } from '@/models/ProbMed';
import { ProbObj } from '@/models/ProbObj';
import { SaludFM } from '@/models/SaludFM';
import { Sesion } from '@/models/Sesion';
import { Tratamiento } from '@/models/Tratamiento';
import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { AnalisisFuService } from '@services/analisisfu.service';
import { AntecedentesService } from '@services/antecedentes.service';
import { DiagnosticoService } from '@services/diagnostico.service';
import { EvolucionService } from '@services/evolucion.service';
import { FormCasoService } from '@services/formcaso.service';
import { InformeService } from '@services/informe.service';
import { LineaService } from '@services/lineavida.service';
import { OtrasService } from '@services/otras.service';
import { ProblematicaService } from '@services/problematica.service';
import { SaludfmService } from '@services/saludfm.service';
import { SesionService } from '@services/sesiones.service';
import { TratamientoService } from '@services/tratamiento.service';
import * as html2pdf from 'html2pdf.js';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-verinforme',
  templateUrl: './verinforme.component.html',
  styleUrls: ['./verinforme.component.scss']
})
export class VerinformeComponent {
  idx!: any;
  informe: InformeVista = new InformeVista();
  fec_ing:any;
  fec_u_mov:any;
  salud:SaludFM= new SaludFM();
  probmedlist: ProbMed[];
  fecProb:any; 
  prevlist: Previo[];
  conslist: Consumo[];
  cons:Consulta= new Consulta();
  problist: ProbObj[];
  analisis:AnalisisFU= new AnalisisFU();
  evolucion:Evolucion= new Evolucion();
  linealist: LineaVida[];
  otras:Otras= new Otras();
  diag:Diagnostico= new Diagnostico();
  caso:FormCaso= new FormCaso();
  tratalist: Tratamiento[];
  sesiones: Sesion[];
  fecSesion:any;

  constructor(
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private _inf:InformeService,
    private _salu: SaludfmService,
    private _ant: AntecedentesService,
    private _pr: ProblematicaService,
    private _analisis: AnalisisFuService,
    private _evo: EvolucionService,
    private _ln: LineaService,
    private _otras: OtrasService,
    private _diag: DiagnosticoService,
    private _frm: FormCasoService,
    private _tr: TratamientoService,
    private _se:SesionService)
     {}
  ngOnInit(): void {
    this.idx = this.route.snapshot.paramMap.get('idx');
    console.log(this.idx);
    this.cargarInforme();
   
  }


  cargarInforme() {
    this._inf.GetInforme(this.idx).subscribe(
      se => {
      
        this.informe = se;
        console.log(this.informe);
        this.fec_ing =this.datePipe.transform(this.informe.inf_fecha_ingreso,"dd/MM/yyyy");
        this.informe.inf_fecha_ingreso= this.fec_ing;

        this.fec_u_mov =this.datePipe.transform(this.informe.inf_fecha_nacimiento,"dd/MM/yyyy");
        this.informe.inf_fecha_nacimiento= this.fec_u_mov;
        console.log(this.informe);
        this.cargarSalud();
        this.cargarProb();
        this.cargarPrev();
        this.cargarCons();
        this.cargarProbObj();
        this.cargarConsulta();
        this.cargarAnalisis();
        this.cargarEvolucion();
        this.cargarLinea();
        this.cargarOtras();
        this.cargarDiagnostico();
        this.cargarFormCaso();
        this.cargarTrata();
        this.cargarSesiones();
      }, error => {
        //console.log(error);
        Swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }


  cargarSalud() {
    this._salu.GetSalud(this.informe.inf_paciente_id).subscribe(
      Salud => {
        this.salud = Salud;
       /*  console.log(this.salud); */
      }, error => {
        console.log(error);
        //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }

  cargarProb() {
    this._ant.GetProbMedList(this.informe.inf_paciente_id).subscribe(
      fu => {
        this.probmedlist = fu;
        for(let i=0;i<this.probmedlist.length;i++){
          this.fecProb =this.datePipe.transform(this.probmedlist[i].problema_fecha_ini_trata,"dd/MM/yyyy");
          this.probmedlist[i].problema_fecha_ini_trata= this.fecProb;
        }
        //console.log(this.probmedlist);
      }, error => {
        console.log(error);
        //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }

  cargarPrev() {
    this._ant.GetPrevioList(this.informe.inf_paciente_id).subscribe(
      fu => {
        this.prevlist = fu;
        //console.log(this.prevlist);
      }, error => {
        console.log(error);
        //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }

  cargarCons() {
    this._ant.GetConsumoList(this.informe.inf_paciente_id).subscribe(
      fu => {
        this.conslist = fu;
        //console.log(this.conslist);
      }, error => {
        console.log(error);
        //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }

  cargarConsulta() {
    this._pr.GetConsulta(this.informe.inf_paciente_id).subscribe(
      fu => {
        this.cons = fu;
       /*  console.log(this.cons); */
     
      }, error => {
        console.log(error);
        //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }

  cargarProbObj() {
    this._pr.GetProbList(this.informe.inf_paciente_id).subscribe(
      fu => {
        this.problist = fu;
       
        //console.log(this.problist);
      }, error => {
        console.log(error);
        //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }

  cargarAnalisis() {
    this._analisis.GetAnalisis(this.informe.inf_paciente_id).subscribe(
      fu => {
        this.analisis = fu;
       // console.log(this.analisis);
        
      }, error => {
        console.log(error);
        //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }

  cargarEvolucion() {
    this._evo.GetEvo(this.informe.inf_paciente_id).subscribe(
      fu => {
        this.evolucion = fu;
        //console.log(this.evolucion);
       
      }, error => {
        console.log(error);
        //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }

  cargarLinea() {
    this._ln.GetLineaList(this.informe.inf_paciente_id).subscribe(
      fu => {
        this.linealist = fu;
        //console.log(this.linealist);
      }, error => {
        console.log(error);
        //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }

  cargarOtras() {
    this._otras.GetOtras(this.informe.inf_paciente_id).subscribe(
      fu => {
        this.otras = fu;
        //console.log(this.otras);
       
      }, error => {
        console.log(error);
        //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }

  cargarDiagnostico() {
    this._diag.GetDiagnostico(this.informe.inf_paciente_id).subscribe(
      fu => {
        this.diag = fu;
        console.log(this.diag);
      }, error => {
        console.log(error);
        //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }

  cargarFormCaso() {
    this._frm.Getform(this.informe.inf_paciente_id).subscribe(
      fu => {
        this.caso = fu;
        //console.log(this.evolucion);
     
      }, error => {
        console.log(error);
        //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }

  cargarTrata() {
    this._tr.GetTratamientoList(this.informe.inf_paciente_id).subscribe(
      fu => {
        this.tratalist = fu;
       
        //console.log(this.tratalist);
      }, error => {
        console.log(error);
        //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }

  cargarSesiones() {
    this._se.GetSesionList(this.informe.inf_paciente_id).subscribe(
      se => {
      
        this.sesiones = se;
        console.log(this.sesiones);
        for(let i=0;i<this.sesiones.length;i++){
          this.fecSesion =this.datePipe.transform(this.sesiones[i].sesion_fecha_captura,"dd/MM/yyyy");
          this.sesiones[i].sesion_fecha_captura= this.fecSesion;
        }
        console.log(this.sesiones);
    
      }, error => {
        //console.log(error);
        Swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }

  onExportClick(){
    var nombre:string=this.informe.inf_paterno+'_'+this.informe.inf_materno+'_'+this.informe.inf_nombre+'.pdf';
    const options={
      filename:nombre,
      image:{type:'jpeg'},
      html2canvas:{},
   /*    jsPDF:{orientation:'landscape'} */
      jsPDF:{orientation:'portrait'}
      
    }
    const content=document.getElementById('reporte');

    html2pdf()
    .from(content)
    .set(options)
    .save();
  }
}
