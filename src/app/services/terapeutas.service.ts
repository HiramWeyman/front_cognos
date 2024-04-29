import { Evolucion } from '@/models/Evolucion';
import { Padron } from '@/models/Padron';
import { Terapeutas } from '@/models/Terapeutas';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TerapeutasService {

  constructor(private http: HttpClient) { }
  public urlEndPoint = `${environment.rutaAPI}`;
  
 

  GetTerapeutas(): Observable<any[]> {
    return this.http.get(`${environment.rutaAPI}` + '/Terapeuta').pipe(
      map(response => response as any[])
    );
  }

  GetTerapeuta(id:number): Observable<Terapeutas> {
    return this.http.get(`${environment.rutaAPI}` + '/Terapeuta/'+id).pipe(
      map(response => response as Terapeutas)
    );
  }

 

  GuardarTerapeuta(tera: Terapeutas): Observable<Terapeutas> {
    console.log(tera);
    tera.tera_id=0;
    return this.http.post<Terapeutas>(`${environment.rutaAPI+'/Terapeuta'}`, tera);
    //return this.http.post<Evolucion>(`${environment.rutaAPI}` + '/Usuarios/registro', salud);
  }

  UpdateTerapeuta(tera: Terapeutas): Observable<Terapeutas> {
    return this.http.patch<Terapeutas>(`${environment.rutaAPI+ '/Terapeuta/'+tera.tera_id}` , tera);
  }

  DeleteTerapeuta(id: number): Observable<Terapeutas> {
    return this.http.delete<Terapeutas>(`${environment.rutaAPI+ '/Terapeuta/'+id}`);
  }
}
