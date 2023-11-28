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
import { ResultadosSCL } from '@/models/ResultadosSCL';

@Injectable({
  providedIn: 'root'
})
export class ResultadosService {

  constructor(private http: HttpClient) { }
  public urlEndPoint = `${environment.rutaAPI}`;

/*   GetComentarios(Comentarios: Comentarios): Observable<Comentarios> {
    return this.http.post<Comentarios>(`${environment.rutaAPI}` + '/Comentarios', Comentarios);
  } */

  GetResultadosSCLList(Id:number): Observable<ResultadosSCL[]> {
    return this.http.get(`${environment.rutaAPI}` + '/scl/testSCLRespuestas/'+Id).pipe(
      map(response => response as ResultadosSCL[])
    );
  }

  GetTotalSCL(id:number)  {
    return this.http.get(`${environment.rutaAPI}` + '/scl/testSCLTotal/'+id);
  }




}