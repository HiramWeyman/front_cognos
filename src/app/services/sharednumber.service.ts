import { Tratamiento } from '@/models/Tratamiento';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharednumberService {
  Sessiontab=sessionStorage.getItem('IndexTab');
  numeroSubject$ = new BehaviorSubject(this.Sessiontab)
  numero$: Observable<string> = this.numeroSubject$.asObservable();
  updateNumero(newNumero: string) {
    this.numeroSubject$.next(newNumero)
  }

}