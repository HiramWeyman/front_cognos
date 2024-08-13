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
import { Envio } from '@/models/envioPruebas';

@Injectable({
  providedIn: 'root'
})
export class ScidService {

  constructor(private http: HttpClient) { }
  public urlEndPoint = `${environment.rutaAPI}`;

  //Guardar Archivos
  public pruebasSCID(id_pac: number,tipo_prueba:number,maestro_id:number,pruebaSCID: File): Observable<any> {
    const formData = new FormData();
    formData.append('files', pruebaSCID)
    console.log(formData);
    return this.http.post<any>(`${this.urlEndPoint+'/scid/GuardarImagenScid?id_pac='+id_pac+'&tipo_prueba='+tipo_prueba+'&maestro_id='+maestro_id}`, formData)  }


  UpdatePruebaSCID(id: number, prueba: File): Observable<any> {
    const formData = new FormData();
    formData.append('files', prueba)
    console.log(formData);
    return this.http.patch<any>(`${environment.rutaAPI}` + '/Archivos/Archivos/'+id, formData);
  }


  GetDiagrama(id:number): Observable<any> {
    return this.http.get(`${environment.rutaAPI}` + '/scid/VerArchivosSCID/'+id).pipe(
      map(response => response as any)
    );
  }

  //Asignar los id a la tabla mostrar en expediente
AsignarIdsImgSCID(ids:string,prueba:number,exp:number,id_imagen:string)  {
    console.log('Entra');
    console.log(ids);
    console.log(id_imagen);
    return this.http.delete(`${environment.rutaAPI}` + '/scid/AsignarPruebasScid?ids='+ids+'&prueba='+prueba+'&exp='+exp+'&imagen_id='+id_imagen);
  }


    

}