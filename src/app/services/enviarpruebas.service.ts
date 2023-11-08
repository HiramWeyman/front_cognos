import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Gatekeeper } from 'gatekeeper-client-sdk';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Login } from '@/models/Login';
import { Observable, map } from 'rxjs';
import { Sesion } from '@/models/Sesion';
import { SesionVista } from '@/models/SesionVista';
import { Comentarios } from '@/models/Comentarios';
import { Envio } from '@/models/envioPruebas';

@Injectable({
  providedIn: 'root'
})
export class PruebasService {
  enviar :Envio =new Envio();
  constructor(private http: HttpClient) { }
  public urlEndPoint = `${environment.rutaAPI}`;
    EnviarPrueba(id_pac:number,email:string,num_prueba:number): Observable<string> {
      this.enviar.id_pac=id_pac;
      this.enviar.num_prueba=num_prueba;
      this.enviar.email=email;
      console.log(this.enviar);
    return this.http.post<string>(`${this.urlEndPoint+'/Envio'}`, this.enviar);
    //return this.http.post<comFM>(`${environment.rutaAPI}` + '/Usuarios/registro', com);
  }



}