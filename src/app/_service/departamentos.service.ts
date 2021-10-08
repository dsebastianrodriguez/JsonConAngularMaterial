import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Departamento } from '../_model/Departamento';
import { Ciudad } from '../_model/Ciudad';
@Injectable({
  providedIn: 'root'
})
export class DepartamentosService {

  private url: string = `${environment.HOST}/departamentos`;
  
  constructor(private http: HttpClient) { }

  public listar(){
    return this.http.get<Departamento[]>(`${this.url}/listar`);
  }

  public listarCiudadPorDepartamento(idDepartamento: number){
    return this.http.get<Ciudad[]>(`${this.url}/ciudad/listarPorDepartamnto/${idDepartamento}`);
  }
  
  /* public listarCiudad(){
    return this.http.get('http://143.244.150.210/movitapp-back/departamentos/ciudad/listarPorDepartamnto/15');
  } */
}