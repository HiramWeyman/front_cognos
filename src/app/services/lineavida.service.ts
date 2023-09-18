
import { LineaVida } from '@/models/LineaVida';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LineaService {

  constructor(private http: HttpClient) { }
  public urlEndPoint = `${environment.rutaAPI}`;
  
  GetLineaList(id:number): Observable<LineaVida[]> {
    return this.http.get(`${environment.rutaAPI}` + '/Linea?id='+id).pipe(
      map(response => response as LineaVida[])
    );
  } 

  GuardarLinea(prob: LineaVida): Observable<LineaVida> {
    console.log(prob);
    return this.http.post<LineaVida>(`${this.urlEndPoint+'/Linea'}`, prob);
    //return this.http.post<trataFM>(`${environment.rutaAPI}` + '/Usuarios/registro', trata);
  }
 
  GetLinea(id:number): Observable<LineaVida> {
    return this.http.get(`${environment.rutaAPI}` + '/Linea/'+id).pipe(
      map(response => response as LineaVida)
    );
  }

  UpdateLinea(prob: LineaVida): Observable<LineaVida> {
    return this.http.patch<LineaVida>(`${environment.rutaAPI}` + '/Linea/'+prob.lin_id, prob);
  }

  DelLinea(id:number): Observable<LineaVida> {
    return this.http.delete<LineaVida>(`${environment.rutaAPI}` + '/Linea/'+id);
  }



}