import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { BarraDeProgresoService } from './_service/barra-de-progreso.service';
import { LoginService } from './_service/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  public flagProgressBar: boolean = true;

  isLoggedIn$: Observable<boolean>;

  constructor(
    private barraDeProgresoService: BarraDeProgresoService,
    public route: ActivatedRoute,
    public logService: LoginService
  ){}

  ngOnInit(): void {
    this.barraDeProgresoService.progressBarReactiva.subscribe(data => {
      this.flagProgressBar = !this.flagProgressBar;
      this.isLoggedIn$ = this.logService.isLoggedIn;
    });
  }


  onLogout() {
    this.logService.cerrarSesion();
  }

}