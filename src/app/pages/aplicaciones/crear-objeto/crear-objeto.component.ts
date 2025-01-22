import { Component, OnInit, TemplateRef } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import Swal from 'sweetalert2';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-crear-objeto',
  templateUrl: './crear-objeto.component.html',
  styleUrls: ['./crear-objeto.component.css']
})

export class CrearObjetoComponent implements OnInit {
  form!: FormGroup;
  p_obj_descri: string = '';
  array: any = [];
  modalRef?: BsModalRef;
  text_menu: string = '';
  p_apl_id: number = 0;
  p_bot_descri: string = '';
  p_bot_abrevi: string = '';
  p_bot_siglas: string = '';
  dataBotones: any;
  p_obj_id: number = 0;
  dtOptions: any = {
    paging: true,
    language: {
      url: "//cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json"
    },
  }
  constructor(private appComponent: AppComponent, private route: ActivatedRoute, private service: UsersService, private router: Router, private modalService: BsModalService, private fb: FormBuilder) {
    this.appComponent.login = false;
    this.route.queryParams.subscribe(params => {
      if (Object.keys(params).length != 0) {
        this.p_apl_id = params['apl_id'];
      }
    });
  }

  ngOnInit() {
    this.listarObjeto();
    console.log(this.array);
    console.log(JSON.stringify(this.array));
  }

  listarObjeto() {
    let post = {
      p_objapp: this.p_apl_id
    }

    this.service.listarObjeto(post).subscribe({
      next: (data: any) => {
        this.array = data;
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  agregarElemento(obj_descri: string) {
    this.array.push({ "obj_tipobj": "MN", "obj_id": 0, "obj_descri": obj_descri, "obj_enlace": "", "obj_iconos": "", "obj_nivhij": [] });
  }

  agregarElementoHijo(i: any) {
    this.array[i]['obj_hijo'].push({ "obj_descri": "Chalon" });
  }

  agregarSubMenuOpciones(nombre: string, icono: string, enlace: string, x: any, i: any) {
    this.array[i]['obj_hijo'][x]['descri'] = nombre;
    this.array[i]['obj_hijo'][x]['icono'] = icono;
    this.array[i]['obj_hijo'][x]['enlace'] = enlace;
    console.log(this.array);
  }

  actualizaNivelUno(inputValue: string, key: string, x: number) {
    this.array[x][key] = inputValue;
    console.log(this.array);
  }

  actualizaNivelDos(inputValue: string, key: string, x: number, y: number) {
    this.array[x]['obj_nivhij'][y][key] = inputValue;
    console.log(this.array);
  }

  actualizaNivelTres(inputValue: string, key: string, x: number, y: number, z: number) {
    this.array[x]['obj_nivhij'][y]['obj_nivhij'][z][key] = inputValue;
    console.log(this.array);
  }

  accionesNivelUno(x: any, agregar: boolean) {
    !agregar ? this.array.splice(x, 1) : this.array[x]['obj_nivhij'].push({ "obj_tipobj": "MN", "obj_id": 0, "obj_descri": "", "obj_enlace": "", "obj_iconos": "", "obj_nivhij": [] });
  }

  accionesNivelDos(x: any, y: any, agregar: boolean) {
    console.log(x, y, agregar)
    !agregar ? this.array[x]['obj_nivhij'].splice(y, 1) : this.array[x]['obj_nivhij'][y]['obj_nivhij'].push({ "obj_tipobj": "MN", "obj_id": 0, "obj_descri": "", "obj_enlace": "", "obj_iconos": "", "obj_nivhij": [] });
  }

  eliminarTercerNivel(x: any, y: any, z: any) {
    this.array[x]['obj_nivhij'][y]['obj_nivhij'].splice(z, 1);
  }

  onSubmit() {

    let post = {
      p_apl_id: this.p_apl_id,
      p_idpadr: 0,
      p_objson: JSON.stringify(this.array),

    }
    Swal.fire({
      title: '<b>Confirmación</b>',
      text: "¿Estás seguro de guardar la información?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.guardarObjeto(post).subscribe({
          next: (data: any) => {
            let result = data[0];
            if (result.hasOwnProperty('error')) {
              if (result.error === 0) {
                Swal.fire({ title: '<h2>Confirmación</h2>', text: result.mensa, icon: 'success', confirmButtonText: 'Cerrar', confirmButtonColor: "#3085d6" }).then((result) => {
                  if (result.isConfirmed) {
                    this.router.navigate(['aplicaciones']);
                  }
                });
              }
            } else {
              Swal.fire('Ocurrió un error', 'Vuelva a intentarlo', 'error')
            }
          },
          error: (error: any) => {
            console.log(error);
          }
        });
      }
    })
  }

  modalBotones(template: TemplateRef<any>, p_obj_id: number) {
    this.p_obj_id = p_obj_id;
    this.setFormBotones();
    this.listarBotonesPorObjeto();
    this.modalRef = this.modalService.show(template, { id: 1, class: 'modal-lg' });
  }

  setFormBotones() {
    this.form = this.fb.group({
      p_bot_descri: ['', [Validators.required]],
      p_bot_abrevi: ['', [Validators.required]],
      p_bot_siglas: ['', [Validators.required]],
    })
  }

  guardarBotones() {
    let post = {
      p_obj_id: this.p_obj_id,
      p_bot_descri: this.p_bot_descri,
      p_bot_abrevi: this.p_bot_abrevi,
      p_bot_siglas: this.p_bot_siglas
    }
    this.service.registrarBoton(post).subscribe({
      next: (data: any) => {
        let result = data[0];
        if (result.hasOwnProperty('error')) {
          if (result.error === 0) {
            this.listarBotonesPorObjeto();
            this.setFormBotones();
          }
        }
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  listarBotonesPorObjeto() {
    let post = {
      p_obj_id: this.p_obj_id
    }
    this.service.listarBoton(post).subscribe({
      next: (data: any) => {
        this.dataBotones = data;
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  cerrarModalBotones() {
    this.modalService.hide(1);
  }
}
