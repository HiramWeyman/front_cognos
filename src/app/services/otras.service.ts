import { Otras } from '@/models/Otras';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OtrasService {

  constructor(private http: HttpClient) { }
  public urlEndPoint = `${environment.rutaAPI}`;
  
  GuardarOtras(otras: Otras): Observable<Otras> {
    console.log(otras);
    console.log(this.urlEndPoint+'/Otras');
    
    return this.http.post<Otras>(`${this.urlEndPoint+'/Otras/CrearOtras'}`, otras);
    //return this.http.post<Otras>(`${environment.rutaAPI}` + '/Usuarios/registro', salud);
  }



  GetOtras(id:number): Observable<Otras> {
    return this.http.get(`${environment.rutaAPI}` + '/Otras/'+id).pipe(
      map(response => response as Otras)
    );
  }

  UpdateOtras(otras: Otras): Observable<Otras> {
    return this.http.patch<Otras>(`${environment.rutaAPI}` + '/Otras/'+otras.otras_id, otras);
  }
}
