import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule} from './material/material.module';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { EditarComponent } from './pages/editar/editar.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { DepartamentosComponent } from './pages/departamentos/departamentos.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CiudadComponent } from './pages/ciudad/ciudad.component';
import { VehiculoComponent } from './pages/vehiculo/vehiculo.component';
const appRoutes: Routes = [
  {path: 'buscar', component: BuscarComponent},
  {path: 'editar', component: EditarComponent},
  {path: 'registro', component: RegistroComponent},
  {path: '**', redirectTo: '/', pathMatch: 'full' }
];


@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    BuscarComponent,
    EditarComponent,
    DepartamentosComponent,
    CiudadComponent,
    VehiculoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
