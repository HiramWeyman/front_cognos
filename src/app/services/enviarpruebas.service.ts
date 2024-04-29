import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Gatekeeper } from 'gatekeeper-client-sdk';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Login } from '@/models/Login';
import { Observable, map } from 'rxjs';
import { Sesion } from '@/models/Sesion';
import { SesionVista } from '@/models/SesionVista';
import { Comentarios } from '@/models/Comentarios';
import { Envio } from '@/models/envioPruebas';

@Injectable({
  providedIn: 'root'
})
export class PruebasService {
  enviar :Envio =new Envio();
  constructor(private http: HttpClient) { }
  public urlEndPoint = `${environment.rutaAPI}`;

    EnviarPrueba(id_pac:number,email:string,num_prueba:number): Observable<string> {
      this.enviar.id_pac=id_pac;
      this.enviar.num_prueba=num_prueba;
      this.enviar.email=email;
      console.log(this.enviar);
    return this.http.post<string>(`${this.urlEndPoint+'/Envio'}`, this.enviar);
    //return this.http.post<comFM>(`${environment.rutaAPI}` + '/Usuarios/registro', com);
  }

  //Guardar Archivos
  public pruebasAll(id_pac: number,tipo_prueba:number, pruebaSCL: File): Observable<any> {
    const formData = new FormData();
    formData.append('files', pruebaSCL)
    console.log(formData);
    return this.http.post<any>(`${this.urlEndPoint+'/Archivos?id_pac='+id_pac+'&tipo_prueba='+tipo_prueba}`, formData)
  }

  GetPruebaSCL(id:number): Observable<any> {
    return this.http.get(`${environment.rutaAPI}` + '/Archivos/ArchivosSCL/'+id).pipe(
      map(response => response as any)
    );
  }

  GetPruebaSCID(id:number): Observable<any> {
    return this.http.get(`${environment.rutaAPI}` + '/Archivos/ArchivosSCID/'+id).pipe(
      map(response => response as any)
    );
  }

  GetDiagrama(id:number): Observable<any> {
    return this.http.get(`${environment.rutaAPI}` + '/Archivos/ArchivosDiagrama/'+id).pipe(
      map(response => response as any)
    );
  }


  UpdatePrueba(id: number, prueba: File): Observable<any> {
    const formData = new FormData();
    formData.append('files', prueba)
    console.log(formData);
    return this.http.patch<any>(`${environment.rutaAPI}` + '/Archivos/Archivos/'+id, formData);
  }


  DeletePruebas(tipo_prueba,id:number): Observable<any>{

    if(tipo_prueba==1){
      return this.http.delete<any>(`${environment.rutaAPI}` + '/Archivos/Archivos/'+id);
    
    }
    else{
      return this.http.delete<any>(`${environment.rutaAPI}` + '/Archivos/Archivos/'+id);
    }

  }

    

}