import { SesionVista } from '@/models/SesionVista';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  pac:SesionVista=new SesionVista();
  constructor(private route: ActivatedRoute, private router: Router,private _se:SesionService,private datePipe: DatePipe) {
  }
  ngOnInit(): void {
    this.expediente=sessionStorage.getItem('Expediente');
    this.idx = this.route.snapshot.paramMap.get('idx');
    this.getDataSesion();
    console.log(this.idx);
  }

  getDataSesion(){
    this._se.GetVistaSesion(this.idx).subscribe(
      fu => {
      
        this.pac = fu;
        this.fec =this.datePipe.transform(this.pac.sesion_fecha_captura,"dd/MM/yyyy");
        this.pac.sesion_fecha_captura= this.fec;
        console.log(this.pac);
      }, error => {
        console.log(error);
        //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
  }

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
