import { Component, OnInit, ViewChild } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { UsersService } from 'src/app/services/users.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aplicacion-perfil',
  templateUrl: './aplicacion-perfil.component.html',
  styleUrls: ['./aplicacion-perfil.component.css']
})

export class AplicacionPerfilComponent implements OnInit {

  //parámetros de búsqueda
  dataAplicacionPerfil: any;
  p_apl_id: number = 0;
  p_prf_id: number = 0;
  dataAplicacion: any;

  //configuración de datatable
  @ViewChild(DataTableDirective, { static: false })
  dtElement: any;
  dtTrigger: Subject<void> = new Subject<void>();
  dtOptions: any = {
    paging: true,
    language: {
      url: "//cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json"
    },
  }

  constructor(private appComponent: AppComponent, private service: UsersService, private router: Router) {
    this.appComponent.login = false;
  }

  ngOnInit(): void {
    this.listarApliacionPerfil();
    this.listarAplicaciones();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  ngAfterViewInit() {
    this.dtTrigger.next();
  }

  listarApliacionPerfil() {
    let post = {
      p_apl_id: this.p_apl_id,
      p_prf_id: this.p_prf_id
    };
    this.service.listarPerfilAplicacion(post).subscribe({
      next: (data: any) => {
        this.dataAplicacionPerfil = data;
        console.log(data);
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

  listarAplicaciones() {
    let post = {
      p_apl_id: 0,
    };
    this.service.listarAplicacion(post).subscribe({
      next: (data: any) => {
        this.dataAplicacion = data;
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  asignarPermiso(p_apf_id: number) {
    this.router.navigate(['/aplicacion-perfil/asignar-permisos'], { queryParams: { p_apf_id: p_apf_id } });
  }
  
}
