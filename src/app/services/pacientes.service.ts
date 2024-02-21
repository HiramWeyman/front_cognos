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
    console.log('Datos paciente');
    console.log(paciente);
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

  GetPacientesR1(id:number): Observable<Pacientes[]> {
    return this.http.get(`${environment.rutaAPI}` + '/PacPeriles/pacientesR1/'+id).pipe(
      map(response => response as Pacientes[])
    );
  }

  GetPacientesR2(id:number): Observable<Pacientes[]> {
    return this.http.get(`${environment.rutaAPI}` + '/PacPeriles/pacientesR2/'+id).pipe(
      map(response => response as Pacientes[])
    );
  }


  GetPacientesTutor(id:number): Observable<Pacientes[]> {
    return this.http.get(`${environment.rutaAPI}` + '/Tutores?id='+id).pipe(
      map(response => response as Pacientes[])
    );
  } 

  GetPacientesTerapeuta(id:number): Observable<Pacientes[]> {
    return this.http.get(`${environment.rutaAPI}` + '/PacPeriles/pacientesTerapeutas?Id='+id).pipe(
      map(response => response as Pacientes[])
    );
  }

  GetAlumnosR1R2(): Observable<any[]> {
    return this.http.get(`${environment.rutaAPI}` + '/PacPeriles/PerAlumnos').pipe(
      map(response => response as any[])
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
