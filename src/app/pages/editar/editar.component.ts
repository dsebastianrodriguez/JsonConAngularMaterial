import { Component, OnInit } from '@angular/core';
import { BarraDeProgresoService } from 'src/app/_service/barra-de-progreso.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

  constructor(private barraDeProgresoService: BarraDeProgresoService) { 
    this.barraDeProgresoService.progressBarReactiva.next(false);
    this.barraDeProgresoService.progressBarReactiva.next(true);
  }

  ngOnInit(): void {
  }

}
