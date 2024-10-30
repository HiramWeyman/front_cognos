import { Creencias } from '@/models/Creencias';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreenciasService {

  constructor(private http: HttpClient) { }
  public urlEndPoint = `${environment.rutaAPI}`;
  
  GuardarCreencias(Creencias: Creencias): Observable<Creencias> {
    console.log(Creencias);
    console.log(this.urlEndPoint+'/Creencias');
    return this.http.post<Creencias>(`${this.urlEndPoint+'/Creencias'}`, Creencias);
    //return this.http.post<Creencias>(`${environment.rutaAPI}` + '/Usuarios/registro', salud);
  }


  GetCreencias(id:number): Observable<Creencias> {
    return this.http.get(`${environment.rutaAPI}` + '/Creencias/'+id).pipe(
      map(response => response as Creencias)
    );
  }

  UpdateCreencias(Creencias: Creencias): Observable<Creencias> {
    return this.http.patch<Creencias>(`${environment.rutaAPI}` + '/Creencias/'+Creencias.creencia_id, Creencias);
  }

//Se obtiene los numeros maestro de la tabla que va a mostrar en el informe
  GetMaestrosCreencia(id:number): Observable<any> {
    return this.http.get(`${environment.rutaAPI}` + '/Creencias/GetIdsPruebaEllis/'+id).pipe(
      map(response => response as any)
    );
  }

  public pruebasCREEHist(id_pac: number,tipo_prueba:number,maestro_id:number,pruebaSCL: File): Observable<any> {
    const formData = new FormData();
    formData.append('files', pruebaSCL)
    console.log(formData);
    return this.http.post<any>(`${this.urlEndPoint+'/ellis/GuardarImagenEllisHist?id_pac='+id_pac+'&tipo_prueba='+tipo_prueba+'&maestro_id='+maestro_id}`, formData)  }
  
  UpdatePruebaCREE(id: number, prueba: File): Observable<any> {
    const formData = new FormData();
    formData.append('files', prueba)
    console.log(formData);
    return this.http.patch<any>(`${environment.rutaAPI}` + '/Archivos/Archivos/'+id, formData);
    }

  GetDiagrama(id:number): Observable<any> {
    return this.http.get(`${environment.rutaAPI}` + '/ellis/VerArchivosCREE/'+id).pipe(
        map(response => response as any)
    );
    }

  InsertaMaestro(id:number, fecha:any,observacion:any) {
    console.log("InsertaMaestro",id)
    console.log("InsertaMaestro",fecha)

    return this.http.post(`${environment.rutaAPI + '/ellis/MaestroHistCREE?maestro_id_paciente='+id+'&fecha='+fecha+'&observ='+observacion}`,'').pipe(
        map((response: any) => {
        return response;
        })
    );

    } 

}
