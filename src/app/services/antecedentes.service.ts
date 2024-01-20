import { Consumo } from '@/models/Consumo';
import { Previo } from '@/models/Previo';
import { ProbMed } from '@/models/ProbMed';
import { SaludFM } from '@/models/SaludFM';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AntecedentesService {

  constructor(private http: HttpClient) { }
  public urlEndPoint = `${environment.rutaAPI}`;
  
  GetProbMedList(id:number): Observable<ProbMed[]> {
    return this.http.get(`${environment.rutaAPI}` + '/Problemamed?id='+id).pipe(
      map(response => response as ProbMed[])
    );
  } 

  GuardarProbMed(salud: ProbMed): Observable<ProbMed> {
    console.log(salud);
    return this.http.post<ProbMed>(`${this.urlEndPoint+'/Problemamed'}`, salud);
    //return this.http.post<SaludFM>(`${environment.rutaAPI}` + '/Usuarios/registro', salud);
  }
 
  GetProbMed(id:number): Observable<ProbMed> {
    return this.http.get(`${environment.rutaAPI}` + '/Problemamed/'+id).pipe(
      map(response => response as ProbMed)
    );
  }

  UpdateProbMed(salud: ProbMed): Observable<ProbMed> {
    return this.http.patch<ProbMed>(`${environment.rutaAPI}` + '/Problemamed/'+salud.problema_id, salud);
  }

  DelProbMed(id:number): Observable<ProbMed> {
    return this.http.delete<ProbMed>(`${environment.rutaAPI}` + '/Problemamed/'+id);
  }

  ///////////previo///////////////
  GetPrevioList(id:number): Observable<Previo[]> {
    return this.http.get(`${environment.rutaAPI}` + '/Previo?id='+id).pipe(
      map(response => response as Previo[])
    );
  } 

  GuardarPrevio(salud: Previo): Observable<Previo> {
   
    return this.http.post<Previo>(`${this.urlEndPoint+'/Previo'}`, salud);
    //return this.http.post<SaludFM>(`${environment.rutaAPI}` + '/Usuarios/registro', salud);
  }
 
  GetPrevio(id:number): Observable<Previo> {
    return this.http.get(`${environment.rutaAPI}` + '/Previo/'+id).pipe(
      map(response => response as Previo)
    );
  }

  UpdatePrevio(salud: Previo): Observable<Previo> {
    return this.http.patch<Previo>(`${environment.rutaAPI}` + '/Previo/'+salud.previo_id, salud);
  }

  DelPrevio(id:number): Observable<Previo> {
    return this.http.delete<Previo>(`${environment.rutaAPI}` + '/Previo/'+id);
  }

  //////Consumo/////////

  GetConsumoList(id:number): Observable<Consumo[]> {
    return this.http.get(`${environment.rutaAPI}` + '/Consumo?id='+id).pipe(
      map(response => response as Consumo[])
    );
  } 


  GuardarConsumo(salud: Consumo): Observable<Consumo> {
    return this.http.post<Consumo>(`${this.urlEndPoint+'/Consumo'}`, salud);
    //return this.http.post<SaludFM>(`${environment.rutaAPI}` + '/Usuarios/registro', salud);
  }
 
  GetConsumo(id:number): Observable<Consumo> {
    return this.http.get(`${environment.rutaAPI}` + '/Consumo/'+id).pipe(
      map(response => response as Consumo)
    );
  }

  UpdateConsumo(salud: Consumo): Observable<Consumo> {
    return this.http.patch<Consumo>(`${environment.rutaAPI}` + '/Consumo/'+salud.consumo_id, salud);
  }

  DelConsumo(id): Observable<Consumo> {
    return this.http.delete<Consumo>(`${environment.rutaAPI}` + '/Consumo/'+id);
  }

  


}
