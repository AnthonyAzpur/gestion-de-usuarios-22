import { Component, OnInit, ViewChild } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { FunctionsUtils } from 'src/app/utils/functions.utils';
import Swal from 'sweetalert2';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';



@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  dataPerfil: any;
  p_prf_id: number = 0;

  @ViewChild(DataTableDirective, { static: false })
  dtElement: any;
  dtTrigger: Subject<void> = new Subject<void>();
  dtOptions: any = {
    paging: true,
    language: {
      url: "//cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json"
    },
  }

  constructor(private appComponent: AppComponent, private service: UsersService, public utils: FunctionsUtils, private router: Router) {
    this.appComponent.login = false;
  }

  ngOnInit() {
    this.listarPerfiles();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  goRoute(id: number) {
    this.router.navigate(['perfil/nuevo-perfil']);
  }

  refrescar() {
    this.p_prf_id = 1;
    this.listarPerfiles();
  }


  listarPerfiles() {
    let post = {
      p_prf_id: this.p_prf_id,
    };
    this.service.listarPerfil(post).subscribe({
      next: (data: any) => {
        this.dataPerfil = data;
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.dtTrigger.next();
        });
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  ngAfterViewInit() {
    this.dtTrigger.next();
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
              this.listarPerfiles()
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
