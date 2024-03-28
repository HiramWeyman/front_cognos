import { AnalisisFU } from '@/models/AnalisisFU';
import { SaludFM } from '@/models/SaludFM';
import { EstructuraFam } from '@/models/estructuraFam';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FamiliarService {

  constructor(private http: HttpClient) { }
  public urlEndPoint = `${environment.rutaAPI}`;
  
  GuardarFamiliar(fam: EstructuraFam): Observable<EstructuraFam> {
    fam.fam_edad=String(fam.fam_edad);
    return this.http.post<EstructuraFam>(`${this.urlEndPoint+'/Familiar/insertaFam'}`, fam);
    //return this.http.post<SaludFM>(`${environment.rutaAPI}` + '/Usuarios/registro', salud);
  }



  GetFamiliar(id:number): Observable<EstructuraFam> {
    return this.http.get(`${environment.rutaAPI}` + '/Familiar/getFamiliar/'+id).pipe(
      map(response => response as EstructuraFam)
    );
  }

  GetFamiliarList(id:string): Observable<EstructuraFam[]> {
    console.log(id);
    return this.http.get(`${environment.rutaAPI}` + '/Familiar/getFamiliarList/'+id).pipe(
      map(response => response as EstructuraFam[])
    );
  }

  UpdateFamiliar(fam: EstructuraFam): Observable<EstructuraFam> {
    return this.http.patch<EstructuraFam>(`${environment.rutaAPI}` + '/Familiar/actualizaFam/'+Number(fam.fam_id), fam);
  }

  DelFamiliar(id:number): Observable<EstructuraFam> {
    return this.http.delete<EstructuraFam>(`${environment.rutaAPI}` + '/Familiar/eliminaFam/'+id);
  }
}
