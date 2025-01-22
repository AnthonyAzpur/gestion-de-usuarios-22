import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, firstValueFrom } from 'rxjs';
import { HttpClientUtils } from '../utils/http-client.utils';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  usuarioPide: string = '41224480';
  app: string = '1';
  constructor(private httpClientUtils: HttpClientUtils) { }

  listarUsuario(data: any) {
    return this.httpClientUtils.postQuery('usuario/listar-usuario', data).pipe(
      map(data => {
        return data;
      })
    );
  }

  guardarUsuario(data: any) {
    return this.httpClientUtils.postQuery('usuario/registrar-usuario', data).pipe(
      map(data => {
        return data;
      })
    );
  }

  actualizarEstadoUsuario(data: any) {
    return this.httpClientUtils.postQuery('usuario/desactivar-usuario', data).pipe(
      map(data => {
        return data;
      })
    );
  }


  listarTipoDocumentoPersona(data: any) {
    return this.httpClientUtils.postQuery('persona/listar-tipo-documento', data).pipe(
      map(data => {
        return data;
      })
    );
  }

  guardarPersona(data: any) {
    return this.httpClientUtils.postQuery('persona/guardar-persona', data).pipe(
      map(data => {
        return data;
      })
    );
  }

  listarPersona(data: any) {
    return this.httpClientUtils.postQuery('persona/listar-persona', data).pipe(
      map(data => {
        return data;
      })
    );
  }

  consultaDniReniec(data: any) {
    data['usuario'] = this.usuarioPide;
    data['app'] = this.app;
    return this.httpClientUtils.postQueryPide('reniec/dni/buscar', data).pipe(
      map(data => {
        return data;
      })
    );
  }

  listarPerfil(data: any) {
    return this.httpClientUtils.postQuery('usuario/listar-perfil', data).pipe(
      map(data => {
        return data;
      })
    );
  }

  guardarPerfil(data: any) {
    return this.httpClientUtils.postQuery('usuario/registrar-perfil', data).pipe(
      map(data => {
        return data;
      })
    );
  }

  listarAplicacion(data: any) {
    return this.httpClientUtils.postQuery('usuario/listar-aplicacion', data).pipe(
      map(data => {
        return data;
      })
    );
  }

  guardarAplicacion(data: any) {
    return this.httpClientUtils.postQuery('usuario/registrar-aplicacion', data).pipe(
      map(data => {
        return data;
      })
    );
  }

  guardarAplicacionPerfil(data: any) {
    return this.httpClientUtils.postQuery('usuario/registrar-aplicacion-perfil', data).pipe(
      map(data => {
        return data;
      })
    );
  }

  listarPerfilAplicacion(data: any) {
    return this.httpClientUtils.postQuery('usuario/listar-aplicacion-perfil', data).pipe(
      map(data => {
        return data;
      })
    )
  }

  guardarObjeto(data: any) {
    return this.httpClientUtils.postQuery('usuario/registrar-objeto', data).pipe(
      map(data => {
        return data;
      })
    )
  }

  listarObjeto(data: any) {
    return this.httpClientUtils.postQuery('usuario/listar-objeto', data).pipe(
      map(data => {
        return data;
      })
    )
  }

  registrarBoton(data: any) {
    return this.httpClientUtils.postQuery('usuario/registrar-boton', data).pipe(
      map(data => {
        return data;
      })
    )
  }

  listarBoton(data: any) {
    return this.httpClientUtils.postQuery('usuario/listar-boton', data).pipe(
      map(data => {
        return data;
      })
    )
  }

  listarAplicacionPerfilBotones(data: any) {
    return this.httpClientUtils.postQuery('usuario/listar-aplicacionperfilbotones', data).pipe(
      map(data => {
        return data;
      })
    )
  }

  registrarPermisoUsuario(data: any) {
    return this.httpClientUtils.postQuery('usuario/guardar-permisousuario', data).pipe(
      map(data => {
        return data;
      })
    )
  }

  listarPermisoUsuarioModal(data: any) {
    return this.httpClientUtils.postQuery('usuario/listar-permisousuariomodal', data).pipe(
      map(data => {
        return data;
      })
    )
  }

  listarAplicacionPerfilObjeto(data: any) {
    return this.httpClientUtils.postQuery('usuario/listar-aplicacionperfilobjeto', data).pipe(
      map(data => {
        return data;
      })
    )
  }


  listarUsuariopermisoapf(data: any) {
    return this.httpClientUtils.postQuery('usuario/listar-permiso-aplicacion-apf', data).pipe(
      map(data => {
        return data;
      })
    );
  }
  
  listarusuarioaplicacion_optimizada_sel(data: any) {
    return this.httpClientUtils.postQuery('usuario/listar-usuario-aplicacion', data).pipe(
      map(data => {
        return data;
      })
    );
  }


  listarusuarios_por_apf_sel(data: any) {
    return this.httpClientUtils.postQuery('usuario/listar-perfil-aplicacion-apf', data).pipe(
      map(data => {
        return data;
      })
    )
  }

  registrarPermisoUsuario_ins(data: any) {
    return this.httpClientUtils.postQuery('usuario/resgistrar-permiso-usuario-apf', data).pipe(
      map(data => {
        return data;
      })
    )
  }
  registrarUsuarioAplicacion_ins(data: any) {
    return this.httpClientUtils.postQuery('usuario/registar-usuario-aplicacion', data).pipe(
      map(data => {
        return data;
      })
    )
  }

  
}