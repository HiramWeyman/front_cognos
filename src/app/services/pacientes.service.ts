import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Gatekeeper } from 'gatekeeper-client-sdk';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Login } from '@/models/Login';
import { Observable, map } from 'rxjs';
import { Pacientes } from '@/models/Pacientes';
import { Terapeutas } from '@/models/Terapeutas';

@Injectable({
  providedIn: 'root'
})
export class PacientesService {

  constructor(private http: HttpClient) { }
  public urlEndPoint = `${environment.rutaAPI}`;
  RegistroPacientes(paciente: Pacientes): Observable<Pacientes> {
    return this.http.post<Pacientes>(`${environment.rutaAPI}` + '/Pacientes', paciente);
  }

/*   GetPacientes(paciente: Pacientes): Observable<Pacientes> {
    return this.http.post<Pacientes>(`${environment.rutaAPI}` + '/Pacientes', paciente);
  } */

  GetPacientes(): Observable<Pacientes[]> {
    return this.http.get(`${environment.rutaAPI}` + '/Pacientes').pipe(
      map(response => response as Pacientes[])
    );
  }

 

  GetPacientesTutor(id:number): Observable<Pacientes[]> {
    return this.http.get(`${environment.rutaAPI}` + '/Tutores?id='+id).pipe(
      map(response => response as Pacientes[])
    );
  } 

  GetTutores(): Observable<Pacientes[]> {
    return this.http.get(`${environment.rutaAPI}` + '/UsuarioRole?id=4').pipe(
      map(response => response as Pacientes[])
    );
  } 

  GetTerapeutas(): Observable<Terapeutas[]> {
    return this.http.get(`${environment.rutaAPI}` + '/Terapeuta').pipe(
      map(response => response as Terapeutas[])
    );
  } 

  GetPaciente(id:number): Observable<Pacientes> {
    return this.http.get(`${environment.rutaAPI}` + '/Pacientes/'+id).pipe(
      map(response => response as Pacientes)
    );
  }

  UpdatePacientes(paciente: Pacientes): Observable<Pacientes> {
    return this.http.patch<Pacientes>(`${environment.rutaAPI}` + '/Pacientes/'+paciente.pac_id, paciente);
  }

}
