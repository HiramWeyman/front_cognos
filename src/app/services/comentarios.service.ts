import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
/* import { Gatekeeper } from 'gatekeeper-client-sdk'; */
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Login } from '@/models/Login';
import { Observable, map } from 'rxjs';
import { Sesion } from '@/models/Sesion';
import { SesionVista } from '@/models/SesionVista';
import { Comentarios } from '@/models/Comentarios';

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {

  constructor(private http: HttpClient) { }
  public urlEndPoint = `${environment.rutaAPI}`;
  GuardarComentarios(com: Comentarios): Observable<Comentarios> {
    console.log(com);
    console.log(this.urlEndPoint+'/Comentarios');
    return this.http.post<Comentarios>(`${this.urlEndPoint+'/Comentarios'}`, com);
    //return this.http.post<comFM>(`${environment.rutaAPI}` + '/Usuarios/registro', com);
  }
/*   GetComentarios(Comentarios: Comentarios): Observable<Comentarios> {
    return this.http.post<Comentarios>(`${environment.rutaAPI}` + '/Comentarios', Comentarios);
  } */

  GetComentariosList(index:number,id_pac:number): Observable<Comentarios[]> {
    return this.http.get(`${environment.rutaAPI}` + '/Comentarios?idx='+index+'&id_paciente='+id_pac).pipe(
      map(response => response as Comentarios[])
    );
  }

  GetComentarios(id:number): Observable<Comentarios> {
    return this.http.get(`${environment.rutaAPI}` + '/Comentarios/'+id).pipe(
      map(response => response as Comentarios)
    );
  }

  UpdateComentarios(com: Comentarios): Observable<Comentarios> {
    return this.http.patch<Comentarios>(`${environment.rutaAPI}` + '/Comentarios/'+com.com_id, com);
  }

/*   DelComentarios(id:number): Observable<Comentarios> {
    return this.http.delete<Comentarios>(`${environment.rutaAPI}` + '/Comentarios/'+id);
  }
 */
 /*  GetVistaComentarios(id:number): Observable<ComentariosVista> {
    return this.http.get(`${environment.rutaAPI}` + '/Vista/'+id).pipe(
      map(response => response as ComentariosVista)
    );
  } */


}