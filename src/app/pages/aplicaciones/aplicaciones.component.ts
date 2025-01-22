import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { FunctionsUtils } from 'src/app/utils/functions.utils';
import Swal from 'sweetalert2';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-aplicaciones',
  templateUrl: './aplicaciones.component.html',
  styleUrls: ['./aplicaciones.component.css']
})
export class AplicacionesComponent implements OnInit {
  form!: FormGroup;
  modalRef?: BsModalRef;
  seleccionPefil: any;
  p_prf_id: number = 0;
  mod_p_apl_id: number = 0;
  dataPerfil: any;

  p_jsperf: any;
  cars = [
    { id: 1, name: 'Volvo' },
    { id: 2, name: 'Saab', disabled: true },
    { id: 3, name: 'Opel' },
    { id: 4, name: 'Audi' },
  ];

  @ViewChild(DataTableDirective, { static: false })
  dtElement: any;
  dtTrigger: Subject<void> = new Subject<void>();
  dtOptions: any = {
    paging: true,
    language: {
      url: "//cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json"
    },
  }

  dataAplicacion: any;
  p_apl_id: number = 0;

  constructor(private appComponent: AppComponent, private service: UsersService, public utils: FunctionsUtils, private router: Router, private modalService: BsModalService, private fb: FormBuilder) {
    this.appComponent.login = false;

  }

  ngOnInit(): void {
    this.listarApliaciones();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  crearObjeto(apl_id: number) {
    this.router.navigate(['/aplicaciones/crear-objeto'], { queryParams: { apl_id: apl_id } });
  }

  ngAfterViewInit() {
    this.dtTrigger.next();
  }

  setForm() {
    this.form = this.fb.group({
      p_jsperf: ['', [Validators.required]],
    })
  }

  listarApliaciones() {
    let post = {
      p_apl_id: this.p_apl_id,
    };
    this.service.listarAplicacion(post).subscribe({
      next: (data: any) => {
        this.dataAplicacion = data;
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

  listarPerfiles() {
    let post = {
      p_prf_id: this.p_prf_id,
    };
    this.service.listarPerfil(post).subscribe({
      next: (data: any) => {
        this.dataPerfil = data;
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  listarPerfilAplicacion() {
    let post = {
      p_apl_id: this.mod_p_apl_id,
      p_prf_id: 0,
    };
    console.log(post);

    this.service.listarPerfilAplicacion(post).subscribe({
      next: (data: any) => {
        // console.log(data);
        this.p_jsperf = [];
        if (Object.keys(data).length > 0) {
          data.forEach((item: any) => {
            this.p_jsperf.push(item.prf_id);
          });
        } else {
          this.p_jsperf = [];
        };

      }
    })
  }

  asignarPerfil(template: TemplateRef<any>, apl_id: number) {
    this.mod_p_apl_id = apl_id;
    this.setForm();
    console.log(this.p_jsperf);
    this.listarPerfilAplicacion();
    this.listarPerfiles();
    this.modalRef = this.modalService.show(template, { id: 1 });
  }

  guardarPerfiles() {
    let arrayPerfil: any = [];

    this.p_jsperf.forEach((item: any) => {
      arrayPerfil.push({ prf_id: item });
    });

    let post = {
      p_apl_id: this.mod_p_apl_id,
      p_jsperf: JSON.stringify(arrayPerfil)
    }
    console.log(post);
    this.service.guardarAplicacionPerfil(post).subscribe({
      next: (data: any) => {
        let result = data[0];
        if (result.hasOwnProperty('error')) {
          if (result.error === 0) {
            this.modalService.hide(1);
            this.listarApliaciones();
            this.p_jsperf = [];
          }
        }
      },
      error: (error: any) => {
        console.log(error);
      }
    });

  }

}
