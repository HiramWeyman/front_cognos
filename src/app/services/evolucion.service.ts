import { Evolucion } from '@/models/Evolucion';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EvolucionService {

  constructor(private http: HttpClient) { }
  public urlEndPoint = `${environment.rutaAPI}`;
  
  GuardarEvo(evo: Evolucion): Observable<Evolucion> {
    console.log(evo);
    console.log(this.urlEndPoint+'/Evolucion');
    return this.http.post<Evolucion>(`${this.urlEndPoint+'/Evolucion'}`, evo);
    //return this.http.post<Evolucion>(`${environment.rutaAPI}` + '/Usuarios/registro', salud);
  }



  GetEvo(id:number): Observable<Evolucion> {
    return this.http.get(`${environment.rutaAPI}` + '/Evolucion/'+id).pipe(
      map(response => response as Evolucion)
    );
  }

  UpdateEvo(evo: Evolucion): Observable<Evolucion> {
    return this.http.patch<Evolucion>(`${environment.rutaAPI}` + '/Evolucion/'+evo.evo_id, evo);
  }
}
