import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Vehiculo } from '../_model/Vehiculo';
import { Asociacion } from './../_model/Asociacion';
import { Observable, pipe, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {
  
  private url: string = `${environment.HOST}/vehiculos`;

  private _refresh$ = new Subject<void>();

  constructor(private http: HttpClient) { }

  get refresh(){
    return this._refresh$;
  }

    listarVehiculo(page: number, size: number){
      return this.http.get<any>(`${this.url}/pageable?page=${page}&size=${size}`);
    }
    
    listarVehiculosPorId(idVehiculo: number){
      return this.http.get<Vehiculo>(`${this.url}/listar/${idVehiculo}`);
    }

    guardarVehiculos(vehiculo: Vehiculo){
      return this.http.post(`${this.url}/guardar`, vehiculo).pipe(tap(() =>  {this._refresh$.next();}));
    }
    
    editarVehiculo(vehiculo: Vehiculo){
      return this.http.put(`${this.url}/editar`, vehiculo).pipe(tap(() =>  {this._refresh$.next();}));
    }

    asociarVehiculos(asociaciar: Asociacion) {​​
      return this.http.post(`${this.url}/asociarcondcutor/${asociaciar.idUsuario}/${asociaciar.idVehiculo}`, asociaciar);
    }​​
  
    desasociarVehiculo(desasociar: Asociacion){
      return this.http.post(`${this.url}/desasociarconductor/${desasociar.idUsuario}/${desasociar.idVehiculo}`, desasociar);
    }

}
