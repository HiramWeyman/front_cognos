import { ProbObj } from '@/models/ProbObj';
import { Consulta } from '@/models/Consulta';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProblematicaService {

  constructor(private http: HttpClient) { }
  public urlEndPoint = `${environment.rutaAPI}`;
  
  GetProbList(id:number): Observable<ProbObj[]> {
    return this.http.get(`${environment.rutaAPI}` + '/ProbObj?id='+id).pipe(
      map(response => response as ProbObj[])
    );
  } 

  GuardarProbObj(prob: ProbObj): Observable<ProbObj> {
    console.log(prob);
    return this.http.post<ProbObj>(`${this.urlEndPoint+'/ProbObj'}`, prob);
    //return this.http.post<trataFM>(`${environment.rutaAPI}` + '/Usuarios/registro', trata);
  }
 
  GetProbObj(id:number): Observable<ProbObj> {
    return this.http.get(`${environment.rutaAPI}` + '/ProbObj/'+id).pipe(
      map(response => response as ProbObj)
    );
  }

  UpdateProbObj(prob: ProbObj): Observable<ProbObj> {
    return this.http.patch<ProbObj>(`${environment.rutaAPI}` + '/ProbObj/'+prob.pro_id, prob);
  }

  DelProbObj(id:number): Observable<ProbObj> {
    return this.http.delete<ProbObj>(`${environment.rutaAPI}` + '/ProbObj/'+id);
  }

  ///consulta

  GuardarConsulta(consulta: Consulta): Observable<Consulta> {
    console.log(consulta);
    return this.http.post<Consulta>(`${this.urlEndPoint+'/ConsultaM'}`, consulta);
 
  }



  GetConsulta(id:number): Observable<Consulta> {
    return this.http.get(`${environment.rutaAPI}` + '/ConsultaM/'+id).pipe(
      map(response => response as Consulta)
    );
  }

  UpdateConsulta(consulta: Consulta): Observable<Consulta> {
    console.log(consulta)
    return this.http.patch<Consulta>(`${environment.rutaAPI}` + '/ConsultaM/'+consulta.con_id, consulta);
  }

}