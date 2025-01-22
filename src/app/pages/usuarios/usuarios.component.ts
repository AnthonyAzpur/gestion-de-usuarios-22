import { Component, OnInit, ViewChild, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { UsersService } from 'src/app/services/users.service';
import { FunctionsUtils } from 'src/app/utils/functions.utils';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';  // Importar ng-bootstrap

import {
  TreeviewItem, TreeviewConfig, TreeviewHelper, TreeviewComponent,
  TreeviewEventParser, OrderDownlineTreeviewEventParser, DownlineTreeviewItem
} from 'ngx-treeview';
import { isNil, remove, reverse } from 'lodash';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
  providers: [
    { provide: TreeviewEventParser, useClass: OrderDownlineTreeviewEventParser },
  ]
})
export class UsuariosComponent implements OnInit {
  @ViewChild(TreeviewComponent, { static: false }) treeviewComponent!: TreeviewComponent;
  items: any[] = [
    {
      text: 'Elemento 1',
      value: '1',
      children: [],
    },
    {
      text: 'Elemento 2',
      value: '2',
      children: [
        {
          text: 'Element 2.2',
          value: '2.2'

        }
      ],
    },
  ];
  config: TreeviewConfig = {
    hasAllCheckBox: false,
    hasFilter: false,
    hasCollapseExpand: true,
    decoupleChildFromParent: false,
    maxHeight: 400,
    hasDivider: false
  };
  dataUsuarios: any;
  datausuariopermisoapf:any;
  datausuariospermiso_ins:any;
  dataAccesosusuarios:any;
  dataAplicacion:any;
  p_apl_id: number = 0;
  p_usu_id: number = 0;
  selectedAplicacionId: number =0; 
  
  constructor(private appComponent: AppComponent, private service: UsersService, public utils: FunctionsUtils, private router: Router, private modalService: NgbModal) {
    this.appComponent.login = false;
  }

  ngOnInit() {
    this.listarUsuarios();
    this.listarApliaciones();

  }
  open(content: any) {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title', // Esto es importante para la accesibilidad
      size: 'lg', // Definimos el tamaño del modal (en este caso, grande)
      backdrop: 'static' // Esto evita que el modal se cierre si se hace clic fuera de él
    }).result.then(
      (result) => {
        console.log(`Modal cerrado con: ${result}`);
      },
      (reason) => {
        console.log(`Modal cerrado por: ${reason}`);
      }
    );
  }
  

  removeItem(item: TreeviewItem): void {
    for (const tmpItem of this.items) {
      if (tmpItem === item) {
        remove(this.items, item);
      } else {
        if (TreeviewHelper.removeItem(tmpItem, item)) {
          break;
        }
      }
    }
    this.treeviewComponent.raiseSelectedChange();
  }

  goRoute(id: number) {
    this.router.navigate(['usuarios/nuevo-usuario'], { queryParams: { sta_id: id } });
  }


  listarUsuarios() {
    let post = {
      p_usu_id: 0,
      p_usu_apepat: '',
      p_usu_apemat: '',
      p_usu_nombre: '',
      p_usu_loging: ''
    };
    this.service.listarUsuario(post).subscribe({
      next: (data: any) => {
        console.log(data);
        this.dataUsuarios = data;
        console.log(this.dataUsuarios);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }
  listarUsuariopermisoapf(id: number) {
    let post = {
      p_usu_id: id,
    }
    this.service.listarUsuariopermisoapf (post).subscribe({
      next: (data: any) => {
        console.log(data);
        this.datausuariopermisoapf = data;
        console.log(this.datausuariopermisoapf,"usuarpicion permiso APF");
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  registrarPermisoUsuario_ins(id: number) {
    let post = {
      p_apf_id: id,
      p_usu_id: id,

    };
    this.service.registrarPermisoUsuario_ins(post).subscribe({
      next: (data: any) => {
        console.log(data);
        this.datausuariospermiso_ins = data;
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }
  listarAccesosUsuarios(id: number) {
    // Asignar el id del usuario seleccionado a p_usu_id
    this.p_usu_id = id;
    console.log('Usuario seleccionado para gestionar accesos:', this.p_usu_id);
  
    let post = {
      p_usu_id: this.p_usu_id, // Usar p_usu_id ya asignado
    };
  
    this.service.listarusuarioaplicacion_optimizada_sel(post).subscribe({
      next: (data: any) => {
        console.log(data);
        this.dataAccesosusuarios = data;
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }
  
  listarApliaciones() {
    let post = {
      p_apl_id: this.p_apl_id,
    };
    this.service.listarAplicacion(post).subscribe({
      next: (data: any) => {
        this.dataAplicacion = data;
        console.log(this.dataAplicacion)
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }
  
  registrarUsuarioApliacion() {
    // Verificar si p_usu_id tiene un valor válido
    if (this.p_usu_id === 0 || !this.p_usu_id) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El ID del usuario no es válido. Por favor selecciona un usuario.',
      });
      return;  // Detiene la ejecución si el ID no es válido
    }
  
    // Mostrar la alerta de confirmación
    Swal.fire({
      title: '¿Está seguro?',
      text: '¿Desea agregar acceso a esta aplicación web?',
      showCancelButton: true,
      confirmButtonText: 'Sí, agregar acceso',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Crear el objeto con los parámetros necesarios para la API
        let post = {
          p_usu_id: this.p_usu_id,  // ID del usuario
          p_apl_id: this.selectedAplicacionId,  // ID de la aplicación seleccionada
        };
  
        // Llamada al servicio para registrar el acceso
        this.service.registrarUsuarioAplicacion_ins(post).subscribe({
          next: (data: any) => {
            // Mostrar mensaje de éxito
            Swal.fire('Acceso agregado', 'El acceso a la aplicación web se ha agregado correctamente.', 'success');
            
            // Actualizar la tabla de accesos
            this.listarAccesosUsuarios(this.p_usu_id);
          },
          error: (error: any) => {
            console.log(error);
            // Mostrar mensaje de error en caso de fallo
            Swal.fire('Error', 'Hubo un error al agregar el acceso.', 'error');
          }
        });
      }
    });
  }
  


  desactivar(id: number, status: boolean) {
    let swalText = '';
    (status) ? swalText = '¿Esta seguro de deshabilitar?' : swalText = '¿Esta seguro de habilitar?';;

    Swal.fire({
      icon: 'question',
      title: 'Información',
      text: swalText,
      showConfirmButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Confirmar',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        let data = {
          p_usu_id: id,
          p_usu_activo: (status) ? 0 : 1
        }
        console.log(data);

        this.service.actualizarEstadoUsuario(data).subscribe({
          next: (data: any) => {
            let result = data[0];
            if (result.error === 0) {
              this.listarUsuarios()
            }
          },
          error: (error: any) => {

            console.error(error);
          }
        });
      }
    });
  }

}