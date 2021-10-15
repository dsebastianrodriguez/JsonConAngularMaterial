import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Vehiculo} from 'src/app/_model/Vehiculo';
import {VehiculoService} from './../../_service/vehiculo.service';

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.component.html',
  styleUrls: ['./vehiculo.component.css']
})
export class VehiculoComponent implements OnInit {

  displayedColumns: string [] = ['placa', 'modelo', 'marca', 'tipoVehiuclo', 'capacidad','ver'];
  dataSource = new MatTableDataSource<Vehiculo>();
  @ViewChild(MatSort) sort: MatSort;

  cantidad: number;
  pageIndex: number = 0;
  pageSize: number = 5;

  constructor(private serviceVehiculo: VehiculoService,
    public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.listarPaginado();
  }

  cambiarPagina(e: any){
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.listarPaginado();
  }

  listarPaginado(){
    this.serviceVehiculo.listarVehiculo(this.pageIndex, this.pageSize).subscribe(data => {
      this.dataSource = new MatTableDataSource(data.content);
      this.cantidad = data.totalElements;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }
}
