import { Sesion } from '@/models/Sesion';
import { SesionVista } from '@/models/SesionVista';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '@services/app.service';
import { SesionService } from '@services/sesiones.service';
import * as html2pdf from 'html2pdf.js';
@Component({
  selector: 'app-repsesion',
  templateUrl: './repsesion.component.html',
  styleUrls: ['./repsesion.component.scss']
})
export class RepsesionComponent implements OnInit{
  idx!: any;
  expediente!: any;
  fec:any;
  pac:Sesion=new Sesion();
/*   pac:SesionVista=new SesionVista(); */
  tera:any;
  cotera:any;
  nombretera:any;
  nombrecotera:any;
  text_tarea:any;
  perfil:any;
  constructor(private route: ActivatedRoute, private router: Router,private _se:SesionService,private datePipe: DatePipe,private appService: AppService) {
  }
  ngOnInit(): void {
  
    this.expediente=localStorage.getItem('Expediente');
    this.perfil=localStorage.getItem('UserPerfil');
    this.idx = this.route.snapshot.paramMap.get('idx');
    this.getDataSesion();
    console.log(this.idx);
  }

  getDataSesion(){
    this._se.GetVistaSesion(this.idx).subscribe(
      fu => {
      
        this.pac = fu;
        console.log(this.pac);
        this.fec =this.datePipe.transform(this.pac.sesion_fecha,"dd/MM/yyyy");
        this.pac.sesion_fecha= this.fec;
        console.log(this.pac);
       /*  alert(this.pac.sesion_terapeuta);
        alert(this.pac.sesion_coterapeuta); */
        this.getTerapeuta(Number(this.pac.sesion_terapeuta));
        this.getCoterapeuta(Number(this.pac.sesion_coterapeuta));
        if(Number(this.pac.sesion_rev_tarea)==1){
          this.text_tarea="No realizo intento alguno.";
        }
        else if(Number(this.pac.sesion_rev_tarea)==2){
          this.text_tarea="Realizo intento parcial hacia la tarea.";
        }
        else if(Number(this.pac.sesion_rev_tarea)==3){
          this.text_tarea="Completo algo de la tarea.";
        }
        else if(Number(this.pac.sesion_rev_tarea)==4){
          this.text_tarea="Completo casi toda la tarea.";
        }
        else if(Number(this.pac.sesion_rev_tarea)==5){
          this.text_tarea="Completo toda la tarea.";
        }
        else if(Number(this.pac.sesion_rev_tarea)==6){
          this.text_tarea="NO APLICA – PRIMERA SESIÓN.";
        }
         

  /*       console.log(this.pac.terapeuta);
        console.log(this.pac.coterapeuta);
        this.getTerapeuta(Number(this.pac.terapeuta));
        this.getCoterapeuta(Number(this.pac.coterapeuta)); */
      }, error => {
        console.log(error);
        //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }


  getTerapeuta(terapeuta:number){
    this._se.GetTerapeuta(terapeuta).subscribe(
      fu => {
        this.tera = fu;
        console.log(this.tera);
        this.nombretera= this.tera.tera_paterno+' '+this.tera.tera_materno+' '+this.tera.tera_nombres;
      }, error => {
        console.log(error);
        //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }
  getCoterapeuta(coterapeuta:number){
    this._se.GetCoTerapeuta(coterapeuta).subscribe(
      fu => {
        this.cotera = fu;
        console.log(this.cotera);
        this.nombrecotera= this.cotera.tera_paterno+' '+this.cotera.tera_materno+' '+this.cotera.tera_nombres;
      }, error => {
        console.log(error);
        //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });

      
  }

/*   catTarea(tarea:number){
    this._se.GetCoTerapeuta(tarea).subscribe(
      fu => {
        this.cotera = fu;
        console.log(this.cotera);
        this.nombrecotera= this.cotera.tera_paterno+' '+this.cotera.tera_materno+' '+this.cotera.tera_nombres;
      }, error => {
        console.log(error);
        //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });

  } */

  onExportClick(){
    const options={
      filename:'informe_'+this.pac.sesion_caso+'.pdf',
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
