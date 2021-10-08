import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Departamento } from 'src/app/_model/Departamento';
import { DepartamentosService } from 'src/app/_service/departamentos.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-departamentos',
  templateUrl: './departamentos.component.html',
  styleUrls: ['./departamentos.component.css']
})
export class DepartamentosComponent implements OnInit {

  displayedColumns: string[] = ['idDepartamento', 'nombre', 'ver'];
  dataSource = new MatTableDataSource<Departamento>();
  
  @ViewChild('DepartmentPaginator') paginator: MatPaginator;

  //para el ordenamiento
  @ViewChild(MatSort) sort: MatSort;

  constructor(private DepartamentosService: DepartamentosService,
              public route: ActivatedRoute) { }


  ngOnInit(): void {
    this.DepartamentosService.listar().subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

}
