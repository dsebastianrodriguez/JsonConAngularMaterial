import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { DepartamentosComponent } from './pages/departamentos/departamentos.component';
import { EditarComponent } from './pages/editar/editar.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { CiudadComponent } from './pages/departamentos/ciudad/ciudad.component';
import { VehiculoComponent } from './pages/vehiculo/vehiculo.component';
import { AgregarVehiculoComponent } from './pages/vehiculo/agregar-vehiculo/agregar-vehiculo.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { NotOkComponent } from './pages/not-ok/not-ok.component';
import { NotAllowedComponent } from './pages/not-allowed/not-allowed.component';
import { LoginComponent } from './pages/login/login.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { GuardianService } from './_share/guardian.service';
import { ConductorComponent } from './pages/conductor/conductor.component';
import { AgregarConductorComponent } from './pages/conductor/agregar-conductor/agregar-conductor.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'buscar', component: BuscarComponent},
  {path: 'editar', component: EditarComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'departamentos', component: DepartamentosComponent, children :[
      {path:  'ciudad/:idDep', component: CiudadComponent, canActivate: [GuardianService]}
    ], canActivate: [GuardianService]
  },
  {path: 'vehiculo', component: VehiculoComponent, children: [
    {path: 'agregarvehiculo', component: AgregarVehiculoComponent, canActivate: [GuardianService] },
    {path: 'edicion/:idVehiculo', component: AgregarVehiculoComponent, canActivate: [GuardianService]}
  ], canActivate: [GuardianService]
  },
  {path: 'conductor', component: ConductorComponent, canActivate: [GuardianService],
  children: [
    {path: 'agregar', component: AgregarConductorComponent }
  ],
  },
  //Pagina no encontro
  {path: 'usuario', component: UsuarioComponent, canActivate: [GuardianService]},
  {path: 'login', component: LoginComponent},
  {path: 'error', component: NotOkComponent},
  {path: 'nopermiso', component: NotAllowedComponent},
  {path: '**', component: NotFoundComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
