import { Component } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import * as html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-verinforme',
  templateUrl: './verinforme.component.html',
  styleUrls: ['./verinforme.component.scss']
})
export class VerinformeComponent {
  idx!: any;
  constructor(private route: ActivatedRoute,private paginator: MatPaginatorIntl) {
    this.paginator.itemsPerPageLabel = "Registros por página";
  }
  ngOnInit(): void {
    this.idx = this.route.snapshot.paramMap.get('idx');
    console.log(this.idx);
  }

  onExportClick(){
    const options={
      filename:'informe_estefania_peliigrini_saneti.pdf',
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
