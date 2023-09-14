import { Tratamiento } from '@/models/Tratamiento';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TratamientoService {

  constructor(private http: HttpClient) { }
  public urlEndPoint = `${environment.rutaAPI}`;
  
  GetTratamientoList(id:number): Observable<Tratamiento[]> {
    return this.http.get(`${environment.rutaAPI}` + '/Tratamiento?id='+id).pipe(
      map(response => response as Tratamiento[])
    );
  } 

  GuardarTratamiento(trata: Tratamiento): Observable<Tratamiento> {
    console.log(trata);
    return this.http.post<Tratamiento>(`${this.urlEndPoint+'/Tratamiento'}`, trata);
    //return this.http.post<trataFM>(`${environment.rutaAPI}` + '/Usuarios/registro', trata);
  }
 
  GetTratamiento(id:number): Observable<Tratamiento> {
    return this.http.get(`${environment.rutaAPI}` + '/Tratamiento/'+id).pipe(
      map(response => response as Tratamiento)
    );
  }

  UpdateTratamiento(trata: Tratamiento): Observable<Tratamiento> {
    return this.http.patch<Tratamiento>(`${environment.rutaAPI}` + '/Tratamiento/'+trata.trata_id, trata);
  }

  DelTratamiento(id:number): Observable<Tratamiento> {
    return this.http.delete<Tratamiento>(`${environment.rutaAPI}` + '/Tratamiento/'+id);
  }

}