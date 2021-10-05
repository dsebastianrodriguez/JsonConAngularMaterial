import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { DepartamentosComponent } from './pages/departamentos/departamentos.component';
import { EditarComponent } from './pages/editar/editar.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { CiudadComponent } from './pages/ciudad/ciudad.component';
import { VehiculoComponent } from './pages/vehiculo/vehiculo.component';
const routes: Routes = [
  {path: 'buscar', component: BuscarComponent},
  {path: 'editar', component: EditarComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'departamentos', component: DepartamentosComponent},
  {path: 'ciudad', component: CiudadComponent},
  {path: 'vehiculo', component: VehiculoComponent}
  //{ path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
