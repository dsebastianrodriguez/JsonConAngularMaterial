import { Component, OnInit } from '@angular/core';
import { DepartamentosService } from '../../_service/departamentos.service';
import { BarraDeProgresoService } from 'src/app/_service/barra-de-progreso.service';
@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  constructor(private departamentosService: DepartamentosService,
              private barraDeProgresoService: BarraDeProgresoService) { }

  ngOnInit(): void {
    this.barraDeProgresoService.progressBarReactiva.next(false);
    this.barraDeProgresoService.progressBarReactiva.next(true);
  }

}
