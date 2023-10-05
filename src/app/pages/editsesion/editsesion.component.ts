import { Sesion } from '@/models/Sesion';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SesionService } from '@services/sesiones.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-editsesion',
  templateUrl: './editsesion.component.html',
  styleUrls: ['./editsesion.component.scss']
})
export class EditsesionComponent implements OnInit {
  idx!: any;
  expediente!: any;
  pac:Sesion=new Sesion();
  constructor(private route: ActivatedRoute, private router: Router,private _se:SesionService) {
   
  }
  ngOnInit(): void {
    this.expediente=sessionStorage.getItem('Expediente');
    this.idx = this.route.snapshot.paramMap.get('idx');
    this.getDataSesion();
    console.log(this.idx);
  }

  validateFormat(event) {
    let key;
    if (event.type === 'paste') {
      key = event.clipboardData.getData('text/plain');
    } else {
      key = event.keyCode;
      key = String.fromCharCode(key);
    }
    const regex = /[0-9]|\./;
     if (!regex.test(key)) {
      event.returnValue = false;
       if (event.preventDefault) {
        event.preventDefault();
       }
     }
    }

    getDataSesion(){
      this._se.Getsesion(this.idx).subscribe(
        fu => {
        
          this.pac = fu;
          //console.log(this.trata);
        }, error => {
          console.log(error);
          //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
        });
    }

    UpdateDatosSesion(sesion:Sesion): void {
      this._se.UpdateSesion(sesion).subscribe(dp => {
        
          swal.fire('Actualizando Datos', `Actualización Exitosa!`, 'success');
          this.pac=new Sesion();
          this.router.navigate(['/exp',this.expediente]);
      
      },error => {
        console.log(error);
        //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
      });
    }
 
}
