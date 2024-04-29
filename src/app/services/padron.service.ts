import { Evolucion } from '@/models/Evolucion';
import { Padron } from '@/models/Padron';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PadronService {

  constructor(private http: HttpClient) { }
  public urlEndPoint = `${environment.rutaAPI}`;
  
 

  GetPadron(): Observable<any[]> {
    return this.http.get(`${environment.rutaAPI}` + '/padronUsuarios').pipe(
      map(response => response as any[])
    );
  }

  ValidaPadronUsr(email:string)  {
    return this.http.get(`${environment.rutaAPI}` + '/validaPadUsr/'+email.trim());
  }

  GuardarPadron(pad: Padron): Observable<Padron> {
    console.log(pad);
    pad.pad_id=0;
    pad.pad_estatus="A";
    return this.http.post<Padron>(`${this.urlEndPoint+'/insertaPadron'}`, pad);
    //return this.http.post<Evolucion>(`${environment.rutaAPI}` + '/Usuarios/registro', salud);
  }

  UpdateEstatus(id: number): Observable<any> {
    return this.http.patch<any>(`${environment.rutaAPI}` + '/updatePadEstatus/'+id, '');
  }
}
