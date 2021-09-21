import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DepartamentosService {

  constructor(private http: HttpClient) { }

  public departamentosreport(){
    return this.http.get('http://143.244.150.210/movitapp-back/departamentos/listar');
  }
}