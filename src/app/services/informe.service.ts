import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Gatekeeper } from 'gatekeeper-client-sdk';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Login } from '@/models/Login';
import { Observable, map } from 'rxjs';
import { Pacientes } from '@/models/Pacientes';
import { Informe } from '@/models/Informe';
import { InformeVista } from '@/models/InformeVista';

@Injectable({
  providedIn: 'root'
})
export class InformeService {

  constructor(private http: HttpClient) { }
  public urlEndPoint = `${environment.rutaAPI}`;
  RegistroInforme(paciente: Informe): Observable<Informe> {
    return this.http.post<Informe>(`${environment.rutaAPI}` + '/Informe', paciente);
  }


  GetInformeList(id:number): Observable<Informe[]> {
    return this.http.get(`${environment.rutaAPI}` + '/Informe?id='+id).pipe(
      map(response => response as Informe[])
    );
  } 

  GetInforme(id:number): Observable<InformeVista> {
    return this.http.get(`${environment.rutaAPI}` + '/VistaInforme/'+id).pipe(
      map(response => response as InformeVista)
    );
  }

 
}
