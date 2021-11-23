import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Vehiculo} from 'src/app/_model/Vehiculo';
import { VehiculoService } from './../../_service/vehiculo.service';
import { AsociarvehiculoComponent } from './asociarvehiculo/asociarvehiculo.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BarraDeProgresoService } from 'src/app/_service/barra-de-progreso.service';

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.component.html',
  styleUrls: ['./vehiculo.component.css']
})
export class VehiculoComponent implements OnInit, OnDestroy {
  suscripcion: Subscription;

  displayedColumns: string [] = ['placa', 'modelo', 'marca', 'tipoVehiuclo', 'capacidad','ver', 'asociar'];
  dataSource = new MatTableDataSource<Vehiculo>();
  @ViewChild(MatSort) sort: MatSort;

  cantidad: number;
  pageIndex: number = 0;
  pageSize: number = 5;

  constructor(private serviceVehiculo: VehiculoService,
                      public route: ActivatedRoute,
                      public dialog: MatDialog,
                      private barraDeProgresoService: BarraDeProgresoService) { }

  async ngOnInit(): Promise<void> {
    this.listarPaginado();
    this.suscripcion = this.serviceVehiculo.refresh.subscribe(() => {
      this.listarPaginado();
    });
  }
  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }

  cambiarPagina(e: any){
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.listarPaginado();
  }

  listarPaginado(){
    this.barraDeProgresoService.progressBarReactiva.next(false);
    this.serviceVehiculo.listarVehiculo(this.pageIndex, this.pageSize).subscribe(data => {
      this.dataSource = new MatTableDataSource(data.content);
      this.cantidad = data.totalElements;
      this.dataSource.sort = this.sort;
      this.barraDeProgresoService.progressBarReactiva.next(true);
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

  abrirDialogo(vehiculo: Vehiculo){
    const dialogRef = this.dialog.open(AsociarvehiculoComponent, {
      width: '450px',
      height: '450px',
      data: {placa: vehiculo.placa, idVehiculo: vehiculo.idVehiculo}
    });
  }

}
