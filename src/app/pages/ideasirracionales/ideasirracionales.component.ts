import { Component, ElementRef, OnInit } from '@angular/core';
/* import { Chart } from 'chart.js'; */
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-ideasirracionales',
  templateUrl: './ideasirracionales.component.html',
  styleUrls: ['./ideasirracionales.component.scss']
})
export class IdeasirracionalesComponent  implements OnInit {
  title = 'chartDemo';
  myChart:any;
  constructor(private elementRef: ElementRef) {
  }

  ngOnInit(){
    this.chartit();
   }
 
   chartit(){
      let htmlRef = this.elementRef.nativeElement.querySelector(`#myChart`);
      this.myChart = new Chart(htmlRef, {
        type: 'bar',
        data: {
            labels: ['Irrac1', 'Irrac2', 'Irrac3', 'Irrac4', 'Irrac5', 'Irrac6','Irrac7','Irrac8','Irrac9','Irrac10',],
            datasets: [{
                label: 'Ideas Irracionales',
                data: [8, 7, 3, 5, 2, 3,7,5,6,2],
                backgroundColor:"red",
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
   }

}
