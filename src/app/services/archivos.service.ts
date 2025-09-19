import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

export interface Archivo {
  archivoId: number;
  nombre: string;
  descripcion: string;
  ruta: string;
  contentType: string;
  fechaSubida: string;
  eliminado: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ArchivosService {
  private apiUrl = environment.rutaAPI; // https://localhost:7161/api

  constructor(private http: HttpClient) {}

  listar(cat:number): Observable<Archivo[]> {
    return this.http.get<Archivo[]>(`${this.apiUrl}/Listaarchivos/${cat}`);
  }

  subir(file: File, descripcion: string, cat:string): Observable<Archivo> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('descripcion', descripcion);
    formData.append('categoriaId', cat);
    
    console.log(formData);
    return this.http.post<Archivo>(`${this.apiUrl}/upload`, formData);
  }

  descargar(id: number): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/download/${id}`);
}

  eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deletearch/${id}`);
  }
}
