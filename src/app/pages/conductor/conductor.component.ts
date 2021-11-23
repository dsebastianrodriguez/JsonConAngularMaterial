import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Conductor } from 'src/app/_model/Conductor';
import { ConductorService } from 'src/app/_service/conductor.service';
import { BarraDeProgresoService } from '../../_service/barra-de-progreso.service';
import { ConfirmaDialogComponent } from './confirma-dialog/confirma-dialog.component';

@Component({
  selector: 'app-conductor',
  templateUrl: './conductor.component.html',
  styleUrls: ['./conductor.component.css']
})
export class ConductorComponent implements OnInit {

  suscripcion: Subscription;

  displayedColumns: string[] = ['nombre', 'apellido', 'documento', 'nick', 'direccion', 'celular', 'correo', 'ciudad', 'opciones'];
  dataSourceConductor = new MatTableDataSource<Conductor>();

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  cantidad: number;
  pageIndex: number = 0;
  pageSize: number = 5;

  constructor(
    private conductorService: ConductorService,
    public route: ActivatedRoute,
    public barradeProgresoService: BarraDeProgresoService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.listarPaginado();
    this.suscripcion = this.conductorService.refreshCond$.subscribe(() => {
      this.listarPaginado();
    });
  }

  cambiarPagina(e: any) {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.listarPaginado();
  }

  listarPaginado() {
    this.barradeProgresoService.progressBarReactiva.next(false);
    this.conductorService.listarPaginado(this.pageIndex, this.pageSize).subscribe(data => {
      this.dataSourceConductor = new MatTableDataSource(data.content);
      this.dataSourceConductor.sort = this.sort;
      this.cantidad = data.totalElements;
      this.barradeProgresoService.progressBarReactiva.next(true);
    });
  }

  applyFilter(filterValue: String) {
    this.dataSourceConductor.filter = filterValue.trim().toLowerCase();
  }

  eliminarConductor(idUser) {
    this.conductorService.eliminar(idUser).subscribe(() => {
      this.openSnackBar('Eliminado correctamente');
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 4000,
    });
  }

  abrirDialogo(conductor: Conductor){
    const dialogRef = this.dialog.open(ConfirmaDialogComponent, {
      width: '450px',
      data: {idUsuario: conductor.idUsuario, nombre: conductor.nombre, apellido: conductor.apellido}
    });
  }

}