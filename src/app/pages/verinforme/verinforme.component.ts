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
import { ActivatedRoute, Router } from '@angular/router';
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
import { FamiliarService } from '@services/familiar.service';
import { AppService } from '@services/app.service';
import { PacientesService } from '@services/pacientes.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { DomSanitizer, SafeHtml, SafeUrl } from '@angular/platform-browser';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
/* import { saveAs } from 'file-saver';
import * as htmlToDocx from 'html-to-docx'; */

/* pdfMake.vfs = pdfFonts.pdfMake.vfs; */

@Component({
  selector: 'app-verinforme',
  templateUrl: './verinforme.component.html',
  styleUrls: ['./verinforme.component.scss']
})
export class VerinformeComponent {
  //Datos de prueba
  pacienteNombre = 'Juan Pérez';
  fechaActual = new Date();

  analisisDatos = [
    { descripcion: 'Análisis 1', resultado: 'Positivo' },
    { descripcion: 'Análisis 2', resultado: 'Negativo' }
  ];

  graficaURL = 'https://via.placeholder.com/800x400';

  ///////


  @BlockUI()
  blockUI!: NgBlockUI;
  idx!: any;
  informe: InformeVista = new InformeVista();
  /*  informe: InformeVista = new InformeVista(); */
  fec_ing: any;
  fec_u_mov: any;
  salud: SaludFM = new SaludFM();
  probmedlist: ProbMed[];
  fecProb: any;
  prevlist: Previo[];
  conslist: Consumo[];
  cons: Consulta = new Consulta();
  problist: ProbObj[];
  analisis: AnalisisFU = new AnalisisFU();
  evolucion: Evolucion = new Evolucion();
  linealist: LineaVida[];
  otras: Otras = new Otras();
  diag: Diagnostico = new Diagnostico();
  caso: FormCaso = new FormCaso();
  tratalist: Tratamiento[];
  sesiones: Sesion[];
  fecSesion: any;
  creencia: Creencias = new Creencias();
  creenciaGrafica: any;
  myChart: any;
  pruebascl: any;
  pruebascid: any;
  imgFormCaso: any;
  imagePathSCL: string;
  src: string;
  src2: string;
  src3: string;
  orientacion: string;
  religion: string;
  familiares: any[];
  fechasing: any;
  fechasingRec: any;//Recipiente para transformar la fecha de reingreso
  //Cambio para los archivos de imagen scl
  files: any[] = [];
  files2: any[] = [];
  files3: any[] = [];
  @ViewChild('imgRef') img: ElementRef;
  @ViewChild('imgRef2') img2: ElementRef;
  @ViewChild('imgRef3') img3: ElementRef;
  //variable para graficas ellis
  charts: Chart[] = [];


  ///HTML seguro 


  salud_sueno_desc_: SafeHtml;
  salud_alimentacion_desc_: SafeHtml;
  salud_act_fisica_desc_: SafeHtml;

  con_motivo_: SafeHtml;

  analisis_ant_desc_: SafeHtml;
  analisis_con_desc_: SafeHtml;
  analisis_cons_desc_: SafeHtml;

  evo_factores_: SafeHtml;
  evo_curso_problema_: SafeHtml;

  otras_autocontrol_: SafeHtml;
  otras_aspectos_m_: SafeHtml;
  otras_recursos_p_: SafeHtml;
  otras_apoyo_s_: SafeHtml;
  otras_situacion_v_: SafeHtml;

  form_hipotesis_: SafeHtml;
  form_contraste_: SafeHtml;

  diag_desc_: SafeHtml;
  trata_tecnica_: SafeHtml;

  constructor(
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private _inf: InformeService,
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
    private _se: SesionService,
    private _cree: CreenciasService,
    private _env: PruebasService,
    private _fam: FamiliarService,
    private elementRef: ElementRef,
    private _pac: PacientesService,
    private _sanitizer: DomSanitizer,
    private appService: AppService,
    private router: Router,
    private http: HttpClient) { }
  ngOnInit(): void {

    this.idx = this.route.snapshot.paramMap.get('idx');
    console.log('parametro que se envia');
    console.log(this.idx);
    this.cargarInforme();

  }

  async loadImage() {
    const response = await fetch('assets/img/logoInforme.png');
    const blob = await response.blob();
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    return new Promise<string>((resolve) => {
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
    });
  }

  cargarInforme() {
    this.blockUI.start('Cargando Informe ...');
    console.log(this.idx);
    this._inf.GetInforme(Number(this.idx)).subscribe(
      se => {

        this.informe = se;
        console.log('Se carga el informe');
        console.log(this.informe);
        this.fec_ing = this.datePipe.transform(this.informe.inf_fecha_ingreso, "dd/MM/yyyy");
        this.informe.inf_fecha_ingreso = this.fec_ing;

        this.fec_u_mov = this.datePipe.transform(this.informe.inf_fecha_nacimiento, "dd/MM/yyyy");
        this.informe.inf_fecha_nacimiento = this.fec_u_mov;

        switch (this.informe.inf_orientacion) {
          case 1: {
            this.orientacion = "Heterosexual";
            break;
          }
          case 2: {
            this.orientacion = "Homosexual";
            break;
          }
          case 3: {
            this.orientacion = "Bisexual";
            break;
          }
          case 4: {
            this.orientacion = "Otro";
            break;
          }
        }
        console.log(this.informe.inf_religion);
        switch (this.informe.inf_religion) {
          case 1: {
            this.religion = "Católica";
            break;
          }
          case 2: {
            this.religion = "Cristiana";
            break;
          }
          case 3: {
            this.religion = "Evangélica";
            break;
          }
          case 4: {
            this.religion = "Agnóstico";
            break;
          }
          case 5: {
            this.religion = "No tengo";
            break;
          }
          case 6: {
            this.religion = "Otro";
            break;
          }
        }
        console.log(this.informe);
        this.cargarFamiliares();
        this.CargarFecIng();
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
        this.cargarPruebaIsra();
        this.cargarImagenFormCaso();
        this.blockUI.stop();
      }, error => {
        //console.log(error);
        Swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }


  CargarFecIng() {
    this._pac.GetFechaReingreso(Number(this.informe.inf_paciente_id)).subscribe(
      fe => {
        this.fechasing = fe;
        for (let i = 0; i < this.fechasing.length; i++) {
          this.fechasingRec = this.datePipe.transform(this.fechasing[i].fecha_rei, "dd/MM/yyyy");
          this.fechasing[i].fecha_rei = this.fechasingRec;
        }
        console.log(this.fechasing);
      }
    );

  }


  cargarSalud() {
    this._salu.GetSalud(this.informe.inf_paciente_id).subscribe(
      Salud => {
        this.salud = Salud;
        this.salud_sueno_desc_ = this._sanitizer.bypassSecurityTrustHtml(this.salud.salud_sueno_desc);
        this.salud_alimentacion_desc_ = this._sanitizer.bypassSecurityTrustHtml(this.salud.salud_alimentacion_desc);
        this.salud_act_fisica_desc_ = this._sanitizer.bypassSecurityTrustHtml(this.salud.salud_act_fisica_desc);
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
        for (let i = 0; i < this.probmedlist.length; i++) {
          this.fecProb = this.datePipe.transform(this.probmedlist[i].problema_fecha_ini_trata, "dd/MM/yyyy");
          this.probmedlist[i].problema_fecha_ini_trata = this.fecProb;
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
        this.con_motivo_ = this._sanitizer.bypassSecurityTrustHtml(this.cons.con_motivo);

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
        this.analisis_ant_desc_ = this._sanitizer.bypassSecurityTrustHtml(this.analisis.analisis_ant_desc);
        this.analisis_con_desc_ = this._sanitizer.bypassSecurityTrustHtml(this.analisis.analisis_con_desc);
        this.analisis_cons_desc_ = this._sanitizer.bypassSecurityTrustHtml(this.analisis.analisis_cons_desc);
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
        this.evo_factores_ = this._sanitizer.bypassSecurityTrustHtml(this.evolucion.evo_factores);
        this.evo_curso_problema_ = this._sanitizer.bypassSecurityTrustHtml(this.evolucion.evo_curso_problema);

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
        this.otras_autocontrol_ = this._sanitizer.bypassSecurityTrustHtml(this.otras.otras_autocontrol);
        this.otras_aspectos_m_ = this._sanitizer.bypassSecurityTrustHtml(this.otras.otras_aspectos_m);
        this.otras_recursos_p_ = this._sanitizer.bypassSecurityTrustHtml(this.otras.otras_recursos_p);
        this.otras_apoyo_s_ = this._sanitizer.bypassSecurityTrustHtml(this.otras.otras_apoyo_s);
        this.otras_situacion_v_ = this._sanitizer.bypassSecurityTrustHtml(this.otras.otras_situacion_v);


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
        this.diag_desc_ = this._sanitizer.bypassSecurityTrustHtml(this.diag.diag_desc);

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
        this.form_hipotesis_ = this._sanitizer.bypassSecurityTrustHtml(this.caso.form_hipotesis);
        this.form_contraste_ = this._sanitizer.bypassSecurityTrustHtml(this.caso.form_contraste);
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
        for (let i = 0; i < this.tratalist.length; i++) {
          // Sanitizar el HTML y almacenarlo en una nueva propiedad
          this.tratalist[i].trata_tecnica_sanitized = this._sanitizer.bypassSecurityTrustHtml(this.tratalist[i].trata_tecnica);
        }
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
        for (let i = 0; i < this.sesiones.length; i++) {
          this.fecSesion = this.datePipe.transform(this.sesiones[i].sesion_fecha, "dd/MM/yyyy");
          this.sesiones[i].sesion_fecha = this.fecSesion;
        }
        console.log(this.sesiones);

      }, error => {
        //console.log(error);
        Swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }

  cargarCreencias() {
    //Traemos los maestros de esta prueba registrados
    this._cree.GetMaestrosCreencia(this.informe.inf_paciente_id).subscribe(
      response => {
        this.creenciaGrafica = response;
        //consultamos los detalles
        this.creenciaGrafica.forEach((item, index) => {
          this.getDetails(item.most_id_maestro, index);
        });
      });
  }

  //Metodo para los detalles
  getDetails(most_id_maestro: number, index: number) {
    this.http.get<any>(`${environment.rutaAPI}/ellis/getSumasEllis/${most_id_maestro}`).subscribe(detail => {
      console.log(`Index: ${index}, Details:`, detail);
      const valores = [
        detail[0].irrac1 ?? 0,
        detail[0].irrac2 ?? 0,
        detail[0].irrac3 ?? 0,
        detail[0].irrac4 ?? 0,
        detail[0].irrac5 ?? 0,
        detail[0].irrac6 ?? 0,
        detail[0].irrac7 ?? 0,
        detail[0].irrac8 ?? 0,
        detail[0].irrac9 ?? 0,
        detail[0].irrac10 ?? 0
      ].map(value => Number(value)); // Asegúrate de convertir a número

      console.log('Valores:', valores);

      const etiquetas = [
        'Irrac1', 'Irrac2', 'Irrac3', 'Irrac4', 'Irrac5',
        'Irrac6', 'Irrac7', 'Irrac8', 'Irrac9', 'Irrac10'
      ];

      this.drawChart(valores, etiquetas, index);
    });

  }

  //Dibujando las graficas
  drawChart(valores: number[], etiquetas: string[], index: number) {
    const canvasId = `canvasId-${index}`;
    const canvasElement = <HTMLCanvasElement>document.getElementById(canvasId);

    // Destruir gráfica anterior si existe
    if (this.charts[index]) {
      this.charts[index].destroy();
    }

    // Crear nueva gráfica
    this.charts[index] = new Chart(canvasElement, {
      type: 'bar',
      data: {
        labels: etiquetas,
        datasets: [
          {
            label: `Gráfica ${index + 1}`,
            data: valores,
            backgroundColor: 'rgba(255, 0, 0, 0.2)',  // Color rojo semitransparente para las barras
            borderColor: 'rgba(255, 0, 0, 1)',   // Color rojo sólido para los bordes de las barras
            /* backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)', */
            borderWidth: 1
          }
        ]
      },
      options: {
        plugins: {
          datalabels: {
            anchor: 'end',
            align: 'start', // Cambia la alineación para evitar que se empalmen con la gráfica siguiente
            /* align: 'top', */
            formatter: (value) => Math.round(value), // Ajusta esto según la precisión deseada
            font: {
              weight: 'bold'
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      },
      plugins: [ChartDataLabels]
    });
  }


  cargarPruebaSCL() {
    this._env.GetPruebaSCL(this.informe.inf_paciente_id).subscribe(
      pac => {
        this.files = pac;
        console.log(this.files);
      }, error => {
        //console.log(error);
        Swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }

  cargarPruebaSCID() {
    this._env.GetPruebaSCID(this.informe.inf_paciente_id).subscribe(
      pac => {
        this.files2 = pac;
        console.log(this.files2);

      }, error => {
        //console.log(error);
        Swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }

  cargarPruebaIsra() {
    this._env.GetPruebaIsra(this.informe.inf_paciente_id).subscribe(
      pac => {
        this.files3 = pac;
        console.log(this.files3);

      }, error => {
        //console.log(error);
        Swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }


  cargarImagenFormCaso() {
    this._env.GetDiagrama(this.informe.inf_paciente_id).subscribe(
      pac => {
        this.imgFormCaso = pac;
        console.log(this.imgFormCaso);
        if (this.imgFormCaso) {
          if (this.imgFormCaso.fileType == '.png') {
            this.src3 = 'data:image/png;base64,' + this.imgFormCaso.dataFiles;
            this.img3.nativeElement.src = this.src3;
          }
          else if (this.imgFormCaso.fileType == '.jpeg') {
            this.src3 = 'data:image/jpeg;base64,' + this.imgFormCaso.dataFiles;
            this.img3.nativeElement.src = this.src3;
          }
          else if (this.imgFormCaso.fileType == '.jpg') {
            this.src3 = 'data:image/jpg;base64,' + this.imgFormCaso.dataFiles;
            this.img3.nativeElement.src = this.src3;
          }


          this.src3 = 'data:image/png;base64,' + this.imgFormCaso.dataFiles;
          this.img3.nativeElement.src = this.src3;
        }
        else {
          return;
        }


      }, error => {
        //console.log(error);
        Swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }

  cargarFamiliares() {

    this._fam.GetFamiliarList(this.informe.inf_llave_fam).subscribe(
      fu => {
        this.familiares = fu;
        console.log(this.familiares);

      }, error => {
        console.log(error);
        //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }
  /* 
    onExportClick(){
      var nombre:string=this.informe.inf_paterno+'_'+this.informe.inf_materno+'_'+this.informe.inf_nombre+'.pdf';
      const options={
        filename:nombre,
        image:{type:'jpeg'},
        html2canvas:{},
        jsPDF:{orientation:'landscape'} 
        jsPDF:{orientation:'portrait'}
        
      }
      const content=document.getElementById('reporte');
  
      html2pdf()
      .from(content)
      .set(options)
      .save();
    }
  */

  /*   generarPDF() {
      const elementx = document.getElementById('content');
      console.log(elementx);
      var nombre:string=this.informe.inf_paterno+'_'+this.informe.inf_materno+'_'+this.informe.inf_nombre+'.pdf';
      const element = document.getElementById('content');
      html2pdf().from(element).set({
        margin: [1, 0.5, 1, 0.5], // [margen superior, margen derecho, margen inferior, margen izquierdo]
        filename:nombre,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, logging: true ,useCORS: true},
  
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      }).save();
    } */
      generarPDFRep1() {
        console.log('Si entra');
        const loadingMessage = document.getElementById('loading');
        loadingMessage.style.display = 'block';
        
        const nombre = `${this.informe.inf_paterno}_${this.informe.inf_materno}_${this.informe.inf_nombre}.pdf`;
      
        // Configuración de html2pdf
        const options = {
          margin: 1,
          filename: nombre,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2, logging: true, dpi: 192, letterRendering: true },
          jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' }
        };
      
        // Selecciona todas las secciones de tu HTML
        const element = document.getElementById('reporte');  // Asegúrate de envolver tus secciones en un contenedor único
      
        // Generar el PDF
        html2pdf().from(element).set(options).save().finally(() => {
          // Ocultar el mensaje de "Descargando reporte"
          loadingMessage.style.display = 'none';
        });
      }


      generarPDFRep() {
        // Mostrar el mensaje de "Descargando reporte"
        const loadingMessage = document.getElementById('loading');
        loadingMessage.style.display = 'block';
      
        const nombre: string = `${this.informe.inf_paterno}_${this.informe.inf_materno}_${this.informe.inf_nombre}.pdf`;
      
        // Configurar PDF en tamaño carta (Letter) en orientación portrait
        const pdf = new jsPDF('p', 'pt', 'letter'); // "letter" equivale a tamaño carta
      
        const container = document.getElementById('reporte');
      
        if (container) {
          // Obtener el ancho y altura del PDF
          const pdfWidth = pdf.internal.pageSize.getWidth(); // Ancho del PDF (612pt para Letter)
          const pdfHeight = pdf.internal.pageSize.getHeight(); // Altura del PDF (792pt para Letter)
      
          // Eliminar estilos que podrían causar problemas en el contenedor
          container.style.width = `${pdfWidth}px`;
          container.style.margin = '0'; // Eliminar márgenes automáticos
      
          // Calcular el factor de escala necesario
          const scaleFactor = pdfWidth / container.scrollWidth;
      
          pdf.html(container, {
            callback: () => {
              // Guardar el PDF
              pdf.save(nombre);
      
              // Ocultar el mensaje de "Descargando reporte"
              loadingMessage.style.display = 'none';
            },
            x: 0, // Margen izquierdo
            y: 0, // Margen superior
            html2canvas: {
              scale: scaleFactor, // Ajustar escala dinámicamente
            },
            margin: [0, 0, 0, 0], // Márgenes eliminados
            autoPaging: 'text', // Habilitar paginación automática
          });
        } else {
          console.error('El contenedor no fue encontrado.');
          loadingMessage.style.display = 'none';
        }
      }
      
      
      

  generaPDF() {
    const element = document.getElementById('contentRep');

    html2canvas(element).then((canvas) => {
      var nombre:string=this.informe.inf_paterno+'_'+this.informe.inf_materno+'_'+this.informe.inf_nombre+'.pdf';
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'pt', 'a4');

      // Ajustar ancho y alto
      const pageWidth = pdf.internal.pageSize.getWidth(); // Ancho de la página
      const imgWidth = pageWidth - 20; // Ancho de la imagen (margen de 10px a la izquierda y derecha)
      const imgHeight = (canvas.height * imgWidth) / canvas.width; // Mantener proporciones
      let heightLeft = imgHeight;

      let position = 0;

      // Centrar imagen en la página
      const xPosition = 10; // Margen izquierdo de 10px
      pdf.addImage(imgData, 'PNG', xPosition, position, imgWidth, imgHeight);
      heightLeft -= pdf.internal.pageSize.getHeight();

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', xPosition, position, imgWidth, imgHeight);
        heightLeft -= pdf.internal.pageSize.getHeight();
      }

      pdf.save(nombre);
    });
  }




  generarPDF() {
     // Mostrar el mensaje de "Descargando reporte"
     const loadingMessage = document.getElementById('loading');
     loadingMessage.style.display = 'block';
    const element = document.getElementById('contentRep');
  
    html2canvas(element).then((canvas) => {
      var nombre = this.informe.inf_paterno + '_' + this.informe.inf_materno + '_' + this.informe.inf_nombre + '.pdf';
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'pt', 'a4');
  
      const pageWidth = pdf.internal.pageSize.getWidth(); // Ancho de la página
      const imgWidth = pageWidth - 20; // Ancho de la imagen (margen de 10px a la izquierda y derecha)
      const imgHeight = (canvas.height * imgWidth) / canvas.width; // Mantener proporciones
      let heightLeft = imgHeight; // Altura restante por imprimir
  
      let position = 0;
  
      // Centrar la primera imagen en la página
      const xPosition = 10; // Margen izquierdo de 10px
      pdf.addImage(imgData, 'PNG', xPosition, position, imgWidth, imgHeight);
      heightLeft -= pdf.internal.pageSize.getHeight(); // Restar la altura de la página
  
      // Si el contenido excede una página, seguimos agregando páginas
      while (heightLeft > 0) {
        position = heightLeft - imgHeight; // Calcular la nueva posición en la página
        pdf.addPage(); // Añadir nueva página
        pdf.addImage(imgData, 'PNG', xPosition, position, imgWidth, imgHeight); // Añadir imagen a la nueva página
        heightLeft -= pdf.internal.pageSize.getHeight(); // Reducir la altura restante
      }
  
      pdf.save(nombre); // Guardar el PDF con el nombre especificado
       // Ocultar el mensaje de "Descargando reporte"
       loadingMessage.style.display = 'none';
    });
  }
  



/*   exportToWord() {
    const content = document.getElementById('contentRep')?.innerHTML;
    if (content) {
      // Convertir HTML a Word utilizando la librería html-to-docx
      const converted = htmlToDocx(content, {
        table: { row: { alignment: 'center' } },
      });

      // Guardar el archivo como docx
      saveAs(converted, 'archivo.docx');
    }
  } */











}
