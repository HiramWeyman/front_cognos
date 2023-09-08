import { Diagnostico } from '@/models/Diagnostico';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiagnosticoService {

  constructor(private http: HttpClient) { }
  public urlEndPoint = `${environment.rutaAPI}`;
  
  GuardarDiagnostico(diag: Diagnostico): Observable<Diagnostico> {
    console.log(diag);
    console.log(this.urlEndPoint+'/Diagnostico');
    return this.http.post<Diagnostico>(`${this.urlEndPoint+'/Diagnostico'}`, diag);
    //return this.http.post<Diagnostico>(`${environment.rutaAPI}` + '/Usuarios/registro', salud);
  }



  GetDiagnostico(id:number): Observable<Diagnostico> {
    return this.http.get(`${environment.rutaAPI}` + '/Diagnostico/'+id).pipe(
      map(response => response as Diagnostico)
    );
  }

  UpdateDiagnostico(diag: Diagnostico): Observable<Diagnostico> {
    return this.http.patch<Diagnostico>(`${environment.rutaAPI}` + '/Diagnostico/'+diag.diag_id, diag);
  }
}
