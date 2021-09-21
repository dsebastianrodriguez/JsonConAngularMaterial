import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DepartamentosService } from '../../_service/departamentos.service';
import { Ciudad } from 'src/app/_model/Ciudad';

@Component({
  selector: 'app-ciudad',
  templateUrl: './ciudad.component.html',
  styleUrls: ['./ciudad.component.css']
})
export class CiudadComponent implements OnInit {

  ELEMENT_DATA: Ciudad[] = [];
  displayedColumns: string[] = ['idCiudad', 'nombre'];
  dataSource = new MatTableDataSource<Ciudad>(this.ELEMENT_DATA);
  
  constructor(private service: DepartamentosService) { }

  ngOnInit(): void {
    this.getAllCiudad();
  }
  public getAllCiudad(){
    let resp = this.service.listarCiudad();
    resp.subscribe(report => this.dataSource.data = report as Ciudad[]);
  }
  
}
