import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SoporteComponent } from './pages/soporte/soporte.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { ConfiguracionComponent } from './pages/configuracion/configuracion.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { CrearUsuarioComponent } from './pages/usuarios/crear-usuario/crear-usuario.component';
import { CrearPerfilComponent } from './pages/perfil/crear-perfil/crear-perfil.component';
import { AplicacionesComponent } from './pages/aplicaciones/aplicaciones.component';
import { CrearAplicacionComponent } from './pages/aplicaciones/crear-aplicacion/crear-aplicacion.component';
import { CrearObjetoComponent } from './pages/aplicaciones/crear-objeto/crear-objeto.component';
import { AplicacionPerfilComponent } from './pages/aplicacion-perfil/aplicacion-perfil.component';
import { AsignarPermisosComponent } from './pages/aplicacion-perfil/asignar-permisos/asignar-permisos.component';
import { AuthGuard } from './guards/auth.guard';
import { CrearPerfilObjetoComponent } from './pages/perfil-objeto/crear-perfil-objeto/crear-perfil-objeto.component';

export const ROUTES: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'administracion/usuarios/perfiles-de-usuario/crear-perfil', component: CrearPerfilComponent, canActivate: [AuthGuard] },
    { path: 'soporte', component: SoporteComponent , canActivate: [AuthGuard]},
    { path: 'perfil', component: PerfilComponent , canActivate: [AuthGuard]},
    { path: 'configuracion', component: ConfiguracionComponent , canActivate: [AuthGuard]},
    { path: 'logout', component: LogoutComponent , canActivate: [AuthGuard]},
    { path: 'usuarios', component: UsuariosComponent , canActivate: [AuthGuard]},
    { path: 'usuarios/crear-usuario', component: CrearUsuarioComponent },
    { path: 'perfil/crear-perfil', component: CrearPerfilComponent },
    { path: 'aplicaciones', component: AplicacionesComponent , canActivate: [AuthGuard]},
    { path: 'aplicaciones/crear-aplicacion', component: CrearAplicacionComponent },
    { path: 'aplicaciones/crear-objeto', component: CrearObjetoComponent },
    { path: 'aplicacion-perfil', component: AplicacionPerfilComponent },
    { path: 'aplicacion-perfil/asignar-permisos', component: AsignarPermisosComponent },
    { path: 'perfil-objeto/crear-perfil-objeto', component: CrearPerfilObjetoComponent },
    
    { path: '', pathMatch: 'full', redirectTo: 'login' },
    { path: '**', pathMatch: 'full', redirectTo: 'login' }
];
