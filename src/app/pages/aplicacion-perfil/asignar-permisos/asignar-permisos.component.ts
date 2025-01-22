import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from 'src/app/app.component';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-asignar-permisos',
  templateUrl: './asignar-permisos.component.html',
  styleUrls: ['./asignar-permisos.component.css']
})
export class AsignarPermisosComponent implements OnInit {

  p_apf_id: number = 0;
  dataObjetoBotones: any;
  datausuariospermisoApf: any;
  prueba: string[] = [];
  constructor(private appComponent: AppComponent, private route: ActivatedRoute, private service: UsersService, private router: Router , private modalService: NgbModal) {
    this.appComponent.login = false;
    this.route.queryParams.subscribe(params => {
      if (Object.keys(params).length != 0) {
        this.p_apf_id = params['p_apf_id'];
      }
    });
  }

  ngOnInit() {
    this.listarObjetoBotones();
    this.listarusuarios_por_apf_sel()
  }
  open(content: any) {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'lg', // Tamaño del modal
      backdrop: 'static' // No permitir que el modal se cierre al hacer clic fuera de él
    }).result.then(
      (result) => {
        console.log(`Modal cerrado con: ${result}`);
      },
      (reason) => {
        console.log(`Modal cerrado por: ${reason}`);
      }
    );
  }

  listarObjetoBotones() {
    let post = {
      p_apf_id: this.p_apf_id,
    };
    this.service.listarAplicacionPerfilBotones(post).subscribe({
      next: (data: any) => {
        console.log(data);
        this.dataObjetoBotones = data;
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  actualizaBotonNivelUno(i: any, p: any) {
    let value = this.dataObjetoBotones[i]['obj_botones'][p]['bot_activo'];
    this.dataObjetoBotones[i]['obj_botones'][p]['bot_activo'] = !value;
    console.log(this.dataObjetoBotones);
  }

  actualizaBotonNivelDos(i: any, x: any, p: any) {
    let value = this.dataObjetoBotones[i]['obj_nivhij'][x]['obj_botones'][p]['bot_activo'];
    this.dataObjetoBotones[i]['obj_nivhij'][x]['obj_botones'][p]['bot_activo'] = !value;
    console.log(this.dataObjetoBotones);
  }

  actualizaBotonNivelTres(i: any, x: any, u: any, p: any) {
    let value = this.dataObjetoBotones[i]['obj_nivhij'][x]['obj_nivhij'][u]['bot_activo'];
    this.dataObjetoBotones[i]['obj_nivhij'][x]['obj_nivhij'][u]['bot_activo'] = !value;
    console.log(this.dataObjetoBotones);
  }

  guardarPermisos() {
    console.log(JSON.stringify(this.dataObjetoBotones));
  }


  listarusuarios_por_apf_sel() {
    let post = {
      p_apf_id: this.p_apf_id,
    };
    this.service.listarusuarios_por_apf_sel(post).subscribe({
      next: (data: any) => {
        console.log(data);
        this.datausuariospermisoApf = data;
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  

}
