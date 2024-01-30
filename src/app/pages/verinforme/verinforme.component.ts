import { AnalisisFU } from '@/models/AnalisisFU';
import { Consulta } from '@/models/Consulta';
import { Consumo } from '@/models/Consumo';
import { Creencias } from '@/models/Creencias';
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
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { AnalisisFuService } from '@services/analisisfu.service';
import { AntecedentesService } from '@services/antecedentes.service';
import { CreenciasService } from '@services/creencias.service';
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
import Chart from 'chart.js/auto';
import { PruebasService } from '@services/enviarpruebas.service';
import { DomSanitizer } from '@angular/platform-browser';

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
  creencia: Creencias = new Creencias();
  myChart: any;
  pruebascl:any;
  pruebascid:any;
  imagePathSCL :string;
  src:string;
  src2:string;
  @ViewChild('imgRef') img:ElementRef;
  @ViewChild('imgRef2') img2:ElementRef;
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
    private _se:SesionService,
    private _cree: CreenciasService,
    private _env:PruebasService,
    private elementRef: ElementRef,
    private _sanitizer: DomSanitizer)
     {}
  ngOnInit(): void {
    this.idx = this.route.snapshot.paramMap.get('idx');
    console.log('parametro que se envia');
    console.log(this.idx);
    this.cargarInforme();
   
  }


  cargarInforme() {
    console.log(this.idx);
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
        this.cargarCreencias();
        this.cargarPruebaSCL();
        this.cargarPruebaSCID();
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

  cargarCreencias() {
    this._cree.GetCreencias(this.informe.inf_paciente_id).subscribe(
      fu => {
        this.creencia = fu;
        console.log(this.creencia);
        if (this.creencia != null) {

          const array = [];
         
          
          array.push(Number(this.creencia.creencia_irra1));
          array.push(this.creencia.creencia_irra2);
          array.push(this.creencia.creencia_irra3);
          array.push(this.creencia.creencia_irra4);
          array.push(this.creencia.creencia_irra5);
          array.push(this.creencia.creencia_irra6);
          array.push(this.creencia.creencia_irra7);
          array.push(this.creencia.creencia_irra8);
          array.push(this.creencia.creencia_irra9);
          array.push(this.creencia.creencia_irra10); 


          let htmlRef = this.elementRef.nativeElement.querySelector(`#myChart`);
          if (this.myChart) {
            this.myChart.destroy();
          }
          this.myChart = new Chart(htmlRef, {
            type: 'bar',
            data: {
              labels: ['Irrac1', 'Irrac2', 'Irrac3', 'Irrac4', 'Irrac5', 'Irrac6', 'Irrac7', 'Irrac8', 'Irrac9', 'Irrac10',],
              datasets: [{
                label: 'Ideas Irracionales',
                //data: [this.creencia1, this.creencia2, this.creencia3, this.creencia4, this.creencia5, this.creencia6, this.creencia7, this.creencia8, this.creencia9, this.creencia10],/*  */
                data: array,
                backgroundColor: "red",
                /* backgroundColor:"#0196FD", */
                borderColor: "#0196FD",
                borderWidth: 1
              },
                /*           {
                            label: 'Dat21',
                            data: [19, 12, 5, 3, 1, 6],
                            backgroundColor:"#FFAF00",
                            borderColor: "#FFAF00",
                            borderWidth: 1
                         } */
              ]
            },
            options: {
              scales: {
                y: {
                  min: 0,
                  max: 9,
                  /* beginAtZero: true */
                }
              }
            }
          });

          console.log(array);
        }
      }, error => {
        console.log(error);
        //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }


  cargarPruebaSCL() {
    this._env.GetPruebaSCL(this.informe.inf_paciente_id).subscribe(
      pac => {
        this.pruebascl = pac;
        console.log(this.pruebascl);
        console.log(this.pruebascl.dataFiles);
        if(this.pruebascl.fileType=='.png'){
          this.src = 'data:image/png;base64,'+this.pruebascl.dataFiles;
          this.img.nativeElement.src = this.src;
        }
        else if(this.pruebascl.fileType=='.jpeg'){
          this.src = 'data:image/jpeg;base64,'+this.pruebascl.dataFiles;
          this.img.nativeElement.src = this.src;
        }
        else if(this.pruebascl.fileType=='.jpg'){
          this.src = 'data:image/jpg;base64,'+this.pruebascl.dataFiles;
          this.img.nativeElement.src = this.src;
        }
     
   
      
      }, error => {
        //console.log(error);
        Swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }

  cargarPruebaSCID() {
    this._env.GetPruebaSCID(this.informe.inf_paciente_id).subscribe(
      pac => {
        this.pruebascid = pac;
         console.log(this.pruebascid); 

         if(this.pruebascid.fileType=='.png'){
          this.src2 = 'data:image/png;base64,'+this.pruebascid.dataFiles;
          this.img2.nativeElement.src = this.src2;
        }
        else if(this.pruebascid.fileType=='.jpeg'){
          this.src2 = 'data:image/jpeg;base64,'+this.pruebascid.dataFiles;
          this.img2.nativeElement.src = this.src2;
        }
        else if(this.pruebascid.fileType=='.jpg'){
          this.src2 = 'data:image/jpg;base64,'+this.pruebascid.dataFiles;
          this.img2.nativeElement.src = this.src2;
        }


         this.src2 = 'data:image/png;base64,'+this.pruebascid.dataFiles;
         this.img2.nativeElement.src = this.src2;
       
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
