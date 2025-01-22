import { NgModule, Injectable, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';
import { Socket } from 'ngx-socket-io';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { MenuComponent } from './components/menu/menu.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { SoporteComponent } from './pages/soporte/soporte.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { ConfiguracionComponent } from './pages/configuracion/configuracion.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { ToastComponent } from './components/toast/toast.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { CrearUsuarioComponent } from './pages/usuarios/crear-usuario/crear-usuario.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { DataTablesModule } from "angular-datatables";
import { DataTableDirective } from 'angular-datatables';
import { CrearPerfilComponent } from './pages/perfil/crear-perfil/crear-perfil.component';
import { AplicacionesComponent } from './pages/aplicaciones/aplicaciones.component';
import { CrearAplicacionComponent } from './pages/aplicaciones/crear-aplicacion/crear-aplicacion.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from "ngx-bootstrap/modal";
import { TreeviewModule } from 'ngx-treeview';
import { CrearObjetoComponent } from './pages/aplicaciones/crear-objeto/crear-objeto.component';
import { AplicacionPerfilComponent } from './pages/aplicacion-perfil/aplicacion-perfil.component';
import { AsignarPermisosComponent } from './pages/aplicacion-perfil/asignar-permisos/asignar-permisos.component';
import { PerfilObjetoComponent } from './pages/perfil-objeto/perfil-objeto.component';
import { CrearPerfilObjetoComponent } from './pages/perfil-objeto/crear-perfil-objeto/crear-perfil-objeto.component';


@Injectable()
export class chatNovaWS extends Socket {
  constructor() {
    super({ url: 'http://localhost:3000', options: { transports: ['websocket'], upgrade: false, reconnection: true, reconnectionDelay: 500, reconnectionDelayMax: 1000, autoConnect: false } });
  }
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    DashboardComponent,
    NavbarComponent,
    FooterComponent,
    TopbarComponent,
    SoporteComponent,
    PerfilComponent,
    ConfiguracionComponent,
    LogoutComponent,
    CrearPerfilComponent,
    ToastComponent,
    UsuariosComponent,
    CrearUsuarioComponent,
    AplicacionesComponent,
    CrearAplicacionComponent,
    CrearObjetoComponent,
    AplicacionPerfilComponent,
    AsignarPermisosComponent,
    PerfilObjetoComponent,
    CrearPerfilObjetoComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgxDropzoneModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgSelectModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    DataTablesModule,
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    TreeviewModule.forRoot(),
    RouterModule.forRoot(ROUTES, { useHash: false }),
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  providers: [
    chatNovaWS,
    ToastComponent,
    DataTableDirective,
    TooltipModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
