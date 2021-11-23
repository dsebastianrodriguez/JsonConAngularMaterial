import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Asociacion } from 'src/app/_model/Asociacion';
import { Conductor } from 'src/app/_model/Conductor';
import { Vehiculo } from 'src/app/_model/Vehiculo';
import { ConductorService } from 'src/app/_service/conductor.service';
import { VehiculoService } from 'src/app/_service/vehiculo.service';

@Component({
  selector: 'app-asociarvehiculo',
  templateUrl: './asociarvehiculo.component.html',
  styleUrls: ['./asociarvehiculo.component.css']
})
export class AsociarvehiculoComponent implements OnInit {
  idVehiculo: number;
  idUsuario: number;
  selectedValue: any;
  dataSource: any[];
  dataSourceSelect: any[];
  vehiculo: Vehiculo;

  ids: number;
  displayedColumns: any[] = ['nombre', 'apellido','desasociar'];
  dataSourceConductores = new MatTableDataSource<Conductor>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    public dialogRef: MatDialogRef<AsociarvehiculoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Vehiculo,
    private conductorService: ConductorService,
    private vehiculoService: VehiculoService
  ) { }

  ngOnInit(): void {
    this.idVehiculo = this.data.idVehiculo;
    this.cargarDatosTabla();
    this.listaNoAsociados();
  }

  cerrarDialogo(){
    this.dialogRef.close({event: 'Cancelo'});
  }

  cargarDatosTabla(){
    this.conductorService.conductoresAsociados(this.idVehiculo).subscribe(res => {
      console.log('data'+ res);
      this.dataSourceConductores = new MatTableDataSource(res);
      this.dataSourceConductores.paginator = this.paginator;
      this.dataSourceConductores.sort = this.sort;
    });
  }

  listaNoAsociados(){
    this.conductorService.conductoresNoAsociados(this.idVehiculo).subscribe(data => {
      this.dataSourceSelect = data;
    });
  }

  desasociar(idUser: number){
    let desasociar = new Asociacion();
    desasociar.idUsuario = idUser;
    desasociar.idVehiculo = this.data.idVehiculo;
    this.vehiculoService.desasociarVehiculo(desasociar).subscribe(() => {
      this.cargarDatosTabla();
      this.listaNoAsociados();
    });
  }

  idSelect(event){
    this.selectedValue = event.idUsuario;
  }

  Asociar(){
    console.log(this.idUsuario);
    let asociacion = new Asociacion();
    asociacion.idUsuario = this.idUsuario;
    asociacion.idVehiculo = this.data.idVehiculo;
    this.vehiculoService.asociarVehiculos(asociacion).subscribe(() => {
      this.cargarDatosTabla();
      this.listaNoAsociados();
    });
  }

}
