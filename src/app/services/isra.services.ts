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
export class IsraService {

  constructor(private http: HttpClient) { }
  public urlEndPoint = `${environment.rutaAPI}`;

  //Guardar Archivos
  public pruebasIsra(id_pac: number,tipo_prueba:number,maestro_id:number,pruebaIsra: File): Observable<any> {
    const formData = new FormData();
    formData.append('files', pruebaIsra)
    console.log(formData);
    return this.http.post<any>(`${this.urlEndPoint+'/isra/GuardarImagenIsra?id_pac='+id_pac+'&tipo_prueba='+tipo_prueba+'&maestro_id='+maestro_id}`, formData)  }
    
  public pruebasIsraHist(id_pac: number,tipo_prueba:number,maestro_id:number,pruebaIsra: File): Observable<any> {
    const formData = new FormData();
    formData.append('files', pruebaIsra)
    console.log(formData);
    return this.http.post<any>(`${this.urlEndPoint+'/isra/GuardarImagenIsraHist?id_pac='+id_pac+'&tipo_prueba='+tipo_prueba+'&maestro_id='+maestro_id}`, formData)  }


  UpdatePruebaIsra(id: number, prueba: File): Observable<any> {
    const formData = new FormData();
    formData.append('files', prueba)
    console.log(formData);
    return this.http.patch<any>(`${environment.rutaAPI}` + '/Archivos/Archivos/'+id, formData);
  }


  GetDiagrama(id:number): Observable<any> {
    return this.http.get(`${environment.rutaAPI}` + '/isra/VerArchivosIsra/'+id).pipe(
      map(response => response as any)
    );
  }

  //Asignar los id a la tabla mostrar en expediente
  AsignarIdsImg(ids:string,prueba:number,exp:number,id_imagen:string)  {
    console.log('Entra');
    console.log(ids);
    console.log(id_imagen);
    return this.http.delete(`${environment.rutaAPI}` + '/isra/AsignarPruebasIsra?ids='+ids+'&prueba='+prueba+'&exp='+exp+'&imagen_id='+id_imagen);
  }

  InsertaMaestro(id:number, fecha:any,observacion:any) {
    console.log("InsertaMaestro",id)
    console.log("InsertaMaestro",fecha)
  
    return this.http.post(`${environment.rutaAPI + '/isra/MaestroHistIsra?maestro_id_paciente='+id+'&fecha='+fecha+'&observ='+observacion}`,'').pipe(
      map((response: any) => {
        return response;
      })
    );
  
  } 

}