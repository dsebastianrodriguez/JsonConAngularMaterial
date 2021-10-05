import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Departamento } from 'src/app/_model/Departamento';
import { DepartamentosService } from 'src/app/_service/departamentos.service';

@Component({
  selector: 'app-departamentos',
  templateUrl: './departamentos.component.html',
  styleUrls: ['./departamentos.component.css']
})
export class DepartamentosComponent implements OnInit {

  ELEMENT_DATA: Departamento[] = [];
  displayedColumns: string[] = ['idDepartamento', 'nombre', 'getdetails'];
  dataSource = new MatTableDataSource<Departamento>(this.ELEMENT_DATA);

  constructor(private service: DepartamentosService) { }

  ngOnInit(): void {
    this.getAllDepartamentos();
  }

  public getAllDepartamentos(){
    let resp = this.service.departamentosListar();
    resp.subscribe(report => this.dataSource.data = report as Departamento[]);
  }
}
