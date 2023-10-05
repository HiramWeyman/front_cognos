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

@Injectable({
  providedIn: 'root'
})
export class SesionService {

  constructor(private http: HttpClient) { }
  public urlEndPoint = `${environment.rutaAPI}`;
  GuardarSesion(trata: Sesion): Observable<Sesion> {
    console.log(trata);
    console.log(this.urlEndPoint+'/Sesion');
    return this.http.post<Sesion>(`${this.urlEndPoint+'/Sesion'}`, trata);
    //return this.http.post<trataFM>(`${environment.rutaAPI}` + '/Usuarios/registro', trata);
  }
/*   GetSesion(sesion: Sesion): Observable<Sesion> {
    return this.http.post<Sesion>(`${environment.rutaAPI}` + '/Sesion', sesion);
  } */

  GetSesionList(id:number): Observable<Sesion[]> {
    return this.http.get(`${environment.rutaAPI}` + '/Sesion?id='+id).pipe(
      map(response => response as Sesion[])
    );
  }

  Getsesion(id:number): Observable<Sesion> {
    return this.http.get(`${environment.rutaAPI}` + '/Sesion/'+id).pipe(
      map(response => response as Sesion)
    );
  }

  UpdateSesion(sesion: Sesion): Observable<Sesion> {
    return this.http.patch<Sesion>(`${environment.rutaAPI}` + '/Sesion/'+sesion.sesion_id, sesion);
  }

  DelSesion(id:number): Observable<Sesion> {
    return this.http.delete<Sesion>(`${environment.rutaAPI}` + '/Sesion/'+id);
  }

  GetVistaSesion(id:number): Observable<SesionVista> {
    return this.http.get(`${environment.rutaAPI}` + '/Vista/'+id).pipe(
      map(response => response as SesionVista)
    );
  }


}
