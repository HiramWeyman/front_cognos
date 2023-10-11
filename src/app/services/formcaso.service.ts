import { FormCaso } from '@/models/FormCaso';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormCasoService {

  constructor(private http: HttpClient) { }
  public urlEndPoint = `${environment.rutaAPI}`;
  
  Guardarform(frm: FormCaso): Observable<FormCaso> {
    console.log(frm);
    console.log(this.urlEndPoint+'/FormCaso');
    return this.http.post<FormCaso>(`${this.urlEndPoint+'/FormCaso'}`, frm);
    //return this.http.post<FormCaso>(`${environment.rutaAPI}` + '/Usuarios/registro', salud);
  }



  Getform(id:number): Observable<FormCaso> {
    return this.http.get(`${environment.rutaAPI}` + '/FormCaso/'+id).pipe(
      map(response => response as FormCaso)
    );
  }

  Updateform(frm: FormCaso): Observable<FormCaso> {
    return this.http.patch<FormCaso>(`${environment.rutaAPI}` + '/FormCaso/'+frm.form_id, frm);
  }
}
