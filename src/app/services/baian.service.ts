import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class BaianService{
    constructor(private http: HttpClient) { }
    public urlEndPoint = `${environment.rutaAPI}`;

    public pruebasBAIANHist(id_pac: number,tipo_prueba:number,maestro_id:number,pruebaSCL: File): Observable<any> {
        const formData = new FormData();
        formData.append('files', pruebaSCL)
        console.log(formData);
        return this.http.post<any>(`${this.urlEndPoint+'/baiAn/GuardarImagenBAIanHist?id_pac='+id_pac+'&tipo_prueba='+tipo_prueba+'&maestro_id='+maestro_id}`, formData)  }
    UpdatePruebaBAIAN(id: number, prueba: File): Observable<any> {
        const formData = new FormData();
        formData.append('files', prueba)
        console.log(formData);
        return this.http.patch<any>(`${environment.rutaAPI}` + '/Archivos/Archivos/'+id, formData);
        }
    
    GetDiagrama(id:number): Observable<any> {
        return this.http.get(`${environment.rutaAPI}` + '/baiAn/VerArchivosBAIAN/'+id).pipe(
            map(response => response as any)
        );
        }

    InsertaMaestro(id:number, fecha:any,observacion:any) {
        console.log("InsertaMaestro",id)
        console.log("InsertaMaestro",fecha)
    
        return this.http.post(`${environment.rutaAPI + '/baiAn/MaestroHistBAIAN?maestro_id_paciente='+id+'&fecha='+fecha+'&observ='+observacion}`,'').pipe(
            map((response: any) => {
            return response;
            })
        );
    
        } 
}
