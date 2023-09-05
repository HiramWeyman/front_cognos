import { SaludFM } from '@/models/SaludFM';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SaludfmService {

  constructor(private http: HttpClient) { }
  public urlEndPoint = `${environment.rutaAPI}`;
  
  GuardarSalud(salud: SaludFM): Observable<SaludFM> {
    console.log(salud);
    console.log(this.urlEndPoint+'/SaludFM');
    return this.http.post<SaludFM>(`${this.urlEndPoint+'/SaludFM'}`, salud);
    //return this.http.post<SaludFM>(`${environment.rutaAPI}` + '/Usuarios/registro', salud);
  }



  GetSalud(id:number): Observable<SaludFM> {
    return this.http.get(`${environment.rutaAPI}` + '/SaludFM/'+id).pipe(
      map(response => response as SaludFM)
    );
  }

  UpdateSalud(salud: SaludFM): Observable<SaludFM> {
    return this.http.patch<SaludFM>(`${environment.rutaAPI}` + '/SaludFM/'+salud.salud_id, salud);
  }
}
