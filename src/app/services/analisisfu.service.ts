import { AnalisisFU } from '@/models/AnalisisFU';
import { SaludFM } from '@/models/SaludFM';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnalisisFuService {

  constructor(private http: HttpClient) { }
  public urlEndPoint = `${environment.rutaAPI}`;
  
  GuardarAnalisis(analisis: AnalisisFU): Observable<AnalisisFU> {
    console.log(analisis);
    console.log(this.urlEndPoint+'/AnalisisFU');
    return this.http.post<AnalisisFU>(`${this.urlEndPoint+'/AnalisisFU'}`, analisis);
    //return this.http.post<SaludFM>(`${environment.rutaAPI}` + '/Usuarios/registro', salud);
  }



  GetAnalisis(id:number): Observable<AnalisisFU> {
    return this.http.get(`${environment.rutaAPI}` + '/AnalisisFU/'+id).pipe(
      map(response => response as AnalisisFU)
    );
  }

  UpdateAnalisis(analisis: AnalisisFU): Observable<AnalisisFU> {
    return this.http.patch<AnalisisFU>(`${environment.rutaAPI}` + '/AnalisisFU/'+analisis.analisis_id, analisis);
  }
}
