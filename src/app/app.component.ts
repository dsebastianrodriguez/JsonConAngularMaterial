import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { LoginService } from './_service/login.service';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BarraDeProgresoService } from './_service/barra-de-progreso.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public flagProgressBar: boolean = true;
  public flagToolbar: boolean = true;
  isLoggedIn$: Observable<boolean>;
  public flaguser: boolean = true;
  public flagadmin: boolean = true;

  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;
  title = 'angular-idle-timeout';

  constructor(
    private barraService: BarraDeProgresoService,
    public route: ActivatedRoute,
    public logService: LoginService,
    private loginService: LoginService,
    private idle: Idle,
    public Keepalive: Keepalive,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {

    idle.setIdle(5000);
    idle.setTimeout(15);
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
    idle.onIdleEnd.subscribe(() => {
      this.idleState = 'sesion no cerrada.'
      console.log(this.idleState);
      this.reset();
    });

    idle.onTimeout.subscribe(() => {
      this.idleState = 'Inactividad completa';
      this.timedOut = true;
      console.log(this.idleState);
      this.router.navigate(['']);
      this.openSnackBar('Sesion terminada  por favor ingrese nuevamente.');
      this.logService.cerrarSesion();
    });

    idle.onIdleStart.subscribe(() => {
      this.idleState = 'Tu estado es inactivo!'
      console.log(this.idleState);

    });

    idle.onTimeoutWarning.subscribe((countdown) => {
      this.idleState = 'Sesion cerrara en:' + countdown + ': Segundos!'
      console.log(this.idleState);
    });

    Keepalive.interval(15);

    Keepalive.onPing.subscribe(() => this.lastPing = new Date());

    this.loginService.isLoggedIn.subscribe(isLoggedIn => {
      if (isLoggedIn) {

        idle.watch();
        this.timedOut = false;
      } else {
        idle.stop();

      }
    });
  }
  reset() {

    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
  }


  ngOnInit(): void {

    if (this.loginService.estaLogueado() == true) {
      this.flagToolbar = false;
    } else {
      this.flagToolbar = true;
    }

    this.loginService.usuarioReactivo.subscribe(data => {
      this.flaguser = data;
    });

    this.loginService.administradorReactivo.subscribe(data => {
      this.flagadmin = data;
    });

    this.loginService.toolbarReactiva.subscribe(data => {
      this.flagToolbar = data;

      const helper = new JwtHelperService();
      let token = sessionStorage.getItem(environment.TOKEN);

      if (!helper.isTokenExpired(token)) {
        const decodedToken = helper.decodeToken(token);
        const rol: string = decodedToken.authorities[0];

        if (rol == 'Conductor') {
          this.flagadmin = true;
          this.flaguser = false;
        } else {
          this.flagadmin = false;
          this.flaguser = true;
        }
      }

    });

    this.barraService.progressBarReactiva.subscribe(data => {
      this.flagProgressBar = data;
      //this.flagprogressbar = !this.flagprogressbar;
      this.isLoggedIn$ = this.logService.isLoggedIn;
    });

  }
  onLogout() {
    this.logService.cerrarSesion();
  }

  public refresh(): void { window.location.reload(); }

  private openSnackBar(mensaje: string) {

    this.snackBar.open(mensaje, '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}