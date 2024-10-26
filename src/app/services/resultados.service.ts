import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
/* import { Gatekeeper } from 'gatekeeper-client-sdk'; */
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Login } from '@/models/Login';
import {  Observable, map } from 'rxjs';
import { Sesion } from '@/models/Sesion';
import { SesionVista } from '@/models/SesionVista';
import { Comentarios } from '@/models/Comentarios';
import { ResultadosSCL } from '@/models/ResultadosSCL';
import { ResultadosBAIAN } from '@/models/ResultadosBAIAN';
import { ResultadosBDIDP } from '@/models/resultadosBDIDP';
import { ResultadosCree } from '@/models/ResultadosCree';
import { ResultadosSCID } from '@/models/RessultadosSCID';
import { Maestro } from '@/models/Maestro';
import { MaestroCambio } from '@/models/MaestroCambio';
import { MaestroIsra } from '@/models/MaestroIsra';

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

  GetTotalBDI(id:number)  {
    return this.http.get(`${environment.rutaAPI}` + '/bdiDp/testBDIdpTotal/'+id);
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

  GetResultadosSCIDList(Id:number): Observable<ResultadosSCID[]> {
    return this.http.get(`${environment.rutaAPI}` + '/scid/testSCIDRespuestas/'+Id).pipe(
      map(response => response as ResultadosSCID[])
    );
  }

  GetResultadosIsraCList(Id:number): Observable<any[]> {
    return this.http.get(`${environment.rutaAPI}` + '/isra/testIsraRespuestasC/'+Id).pipe(
      map(response => response as any[])
    );
  }

  GetResultadosIsraFList(Id:number): Observable<any[]> {
    return this.http.get(`${environment.rutaAPI}` + '/isra/testIsraRespuestasF/'+Id).pipe(
      map(response => response as any[])
    );
  }

  GetResultadosIsraMList(Id:number): Observable<any[]> {
    return this.http.get(`${environment.rutaAPI}` + '/isra/testIsraRespuestasM/'+Id).pipe(
      map(response => response as any[])
    );
  }
//Metodos para obtener los datos de la tabla maestra
getResSCLMaestro(Id:number):Observable<MaestroCambio[]>{
  return this.http.get(`${environment.rutaAPI}` + '/scl/MaestroSCLList/'+Id).pipe(
    map(response => response as MaestroCambio[])
  );
}

//Metodos para obtener los datos de la tabla maestra
getResHistSCLMaestro(Id:number):Observable<MaestroCambio[]>{
  return this.http.get(`${environment.rutaAPI}` + '/scl/MaestroHistSCLList/'+Id).pipe(
    map(response => response as MaestroCambio[])
  );
}

getResSCIDMaestro(Id:number):Observable<Maestro[]>{
  return this.http.get(`${environment.rutaAPI}` + '/scid/MaestroSCIDList/'+Id).pipe(
    map(response => response as Maestro[])
  );
}

getResHistSCIDMaestro(Id:number):Observable<MaestroCambio[]>{
  return this.http.get(`${environment.rutaAPI}` + '/scid/MaestroHistSCIDList/'+Id).pipe(
    map(response => response as MaestroCambio[])
  );
}

getResBAIANMaestro(Id:number):Observable<Maestro[]>{
  return this.http.get(`${environment.rutaAPI}` + '/baiAn/MaestroBAIanList/'+Id).pipe(
    map(response => response as Maestro[])
  );
}

getResBDIDPMaestro(Id:number):Observable<Maestro[]>{
  return this.http.get(`${environment.rutaAPI}` + '/bdiDp/MaestroBDIDPList/'+Id).pipe(
    map(response => response as Maestro[])
  );
}

getResCREEMaestro(Id:number):Observable<Maestro[]>{
  return this.http.get(`${environment.rutaAPI}` + '/ellis/MaestroEllisList/'+Id).pipe(
    map(response => response as Maestro[])
  );
}

getResISRAMaestro(Id:number):Observable<MaestroIsra[]>{
  return this.http.get(`${environment.rutaAPI}` + '/isra/MaestroIsraList/'+Id).pipe(
    map(response => response as MaestroIsra[])
  );
}


//Asignar los id a la tabla mostrar en expediente
AsignarIds(ids:string,prueba:number,exp:number)  {
  return this.http.delete(`${environment.rutaAPI}` + '/ellis/AsignarPruebasEllis?ids='+ids+'&prueba='+prueba+'&exp='+exp);
}



}