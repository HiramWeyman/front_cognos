import { Creencias } from '@/models/Creencias';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreenciasService {

  constructor(private http: HttpClient) { }
  public urlEndPoint = `${environment.rutaAPI}`;
  
  GuardarCreencias(Creencias: Creencias): Observable<Creencias> {
    console.log(Creencias);
    console.log(this.urlEndPoint+'/Creencias');
    return this.http.post<Creencias>(`${this.urlEndPoint+'/Creencias'}`, Creencias);
    //return this.http.post<Creencias>(`${environment.rutaAPI}` + '/Usuarios/registro', salud);
  }


  GetCreencias(id:number): Observable<Creencias> {
    return this.http.get(`${environment.rutaAPI}` + '/Creencias/'+id).pipe(
      map(response => response as Creencias)
    );
  }

  UpdateCreencias(Creencias: Creencias): Observable<Creencias> {
    return this.http.patch<Creencias>(`${environment.rutaAPI}` + '/Creencias/'+Creencias.creencia_id, Creencias);
  }
}
