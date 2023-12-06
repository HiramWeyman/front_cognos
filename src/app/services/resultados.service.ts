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
import { ResultadosBAIAN } from '@/models/ResultadosBAIAN';
import { ResultadosBDIDP } from '@/models/resultadosBDIDP';
import { ResultadosCree } from '@/models/ResultadosCree';

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

  GetResultadosBAIANList(Id:number): Observable<ResultadosBAIAN[]> {
    return this.http.get(`${environment.rutaAPI}` + '/baiAn/testBAIanRespuestas/'+Id).pipe(
      map(response => response as ResultadosBAIAN[])
    );
  }

  GetTotalBAIAN(id:number)  {
    return this.http.get(`${environment.rutaAPI}` + '/baiAn/testBAIanTotal/'+id);
  }

  GetResultadosBDIDPList(Id:number): Observable<ResultadosBDIDP[]> {
    return this.http.get(`${environment.rutaAPI}` + '/bdiDp/testBDIdpRespuestas/'+Id).pipe(
      map(response => response as ResultadosBDIDP[])
    );
  }

  GetTotalBDIDP(id:number)  {
    return this.http.get(`${environment.rutaAPI}` + '/bdiDp/testBDIdpTotal/'+id);
  }

  GetResultadosCreeList(Id:number): Observable<ResultadosCree[]> {
    return this.http.get(`${environment.rutaAPI}` + '/ellis/testEllisRespuestas/'+Id).pipe(
      map(response => response as ResultadosCree[])
    );
  }

  GetCreeTotal1(id:number)  {
    return this.http.get(`${environment.rutaAPI}` + '/ellis/testEllisSuma1/'+id);
  }
  GetCreeTotal2(id:number)  {
    return this.http.get(`${environment.rutaAPI}` + '/ellis/testEllisSuma2/'+id);
  }
  GetCreeTotal3(id:number)  {
    return this.http.get(`${environment.rutaAPI}` + '/ellis/testEllisSuma3/'+id);
  }
  GetCreeTotal4(id:number)  {
    return this.http.get(`${environment.rutaAPI}` + '/ellis/testEllisSuma4/'+id);
  }
  GetCreeTotal5(id:number)  {
    return this.http.get(`${environment.rutaAPI}` + '/ellis/testEllisSuma5/'+id);
  }
  GetCreeTotal6(id:number)  {
    return this.http.get(`${environment.rutaAPI}` + '/ellis/testEllisSuma6/'+id);
  }
  GetCreeTotal7(id:number)  {
    return this.http.get(`${environment.rutaAPI}` + '/ellis/testEllisSuma7/'+id);
  }
  GetCreeTotal8(id:number)  {
    return this.http.get(`${environment.rutaAPI}` + '/ellis/testEllisSuma8/'+id);
  }
  GetCreeTotal9(id:number)  {
    return this.http.get(`${environment.rutaAPI}` + '/ellis/testEllisSuma9/'+id);
  }
  GetCreeTotal10(id:number)  {
    return this.http.get(`${environment.rutaAPI}` + '/ellis/testEllisSuma10/'+id);
  }






}