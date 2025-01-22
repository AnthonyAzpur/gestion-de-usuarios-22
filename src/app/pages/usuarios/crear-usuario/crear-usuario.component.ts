import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { UsersService } from 'src/app/services/users.service';
import { PersonaUtils } from 'src/app/utils/persona.utils';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {

  form!: FormGroup;
  tipoDocumento: any;
  p_ust_id: number = 1;
  p_usu_numdoi: string = '';
  p_usu_apepat: string = '';
  p_usu_apemat: string = '';
  p_usu_nombre: string = '';
  p_foto: string = '';
  mostrarFoto: boolean = false;
  p_tdi_id: string = '';
  per_id: number = 0;
  p_tpe_id: number = 1;

  constructor(private appComponent: AppComponent, private fb: FormBuilder,
    private service: UsersService, private router: Router, private route: ActivatedRoute, private personaUtils: PersonaUtils, private spinner: NgxSpinnerService) {
    this.appComponent.login = false;
  }

  ngOnInit() {
    this.setForm();
    this.listarTipoDocumento();
  }

  listarTipoDocumento() {

    let post = {
      p_tpe_id: this.p_tpe_id
    };
    this.service.listarTipoDocumentoPersona(post).subscribe({
      next: (data: any) => {
        if (data) {
          this.tipoDocumento = data;
        }
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }

  setForm() {
    this.form = this.fb.group({
      // p_ust_id: ['', [Validators.required]],
      p_tdi_id: ['', [Validators.required]],
      p_usu_numdoi: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      p_usu_apepat: ['', [Validators.required]],
      p_usu_apemat: ['', [Validators.required]],
      p_usu_nombre: ['', [Validators.required]],
    })
  }

  onSubmit() {
    if (this.form.valid) {
      let post = {
        p_ust_id: this.p_ust_id,
        p_per_id: this.per_id,
        p_usu_numdoi: this.p_usu_numdoi,
        p_usu_apepat: this.p_usu_apepat,
        p_usu_apemat: this.p_usu_apemat,
        p_usu_nombre: this.p_usu_nombre
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
          this.service.guardarUsuario(post).subscribe({
            next: (data: any) => {
              let result = data[0];
              if (result.hasOwnProperty('error')) {
                if (result.error === 0) {
                  Swal.fire({ title: '<h2>Confirmación</h2>', text: result.mensa, icon: 'success', confirmButtonText: 'Cerrar', confirmButtonColor: "#3085d6" }).then((result) => {
                    if (result.isConfirmed) {
                      this.router.navigate(['usuarios']);
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
  }

  buscarReniec() {
    let post = {
      p_tdi_id: this.p_tdi_id,
      dni: this.p_usu_numdoi
    };
    // if (this.p_usu_numdoi != '') {
    this.service.consultaDniReniec(post).subscribe({
      next: (data: any) => {
        if (data.hasOwnProperty('consultarResponse')) {
          if (data.consultarResponse.return.coResultado === '0000') {
            let dataPide = data.consultarResponse.return.datosPersona;
            this.p_usu_apepat = dataPide.apPrimer;
            this.p_usu_apemat = dataPide.apSegundo;
            this.p_usu_nombre = dataPide.prenombres;
            this.mostrarFoto = true;
            this.p_foto = dataPide.foto;
            this.guardarPersona();
            this.spinner.hide()
          } else {
            this.limpiarFormulario();
            this.mostrarFoto = false;
            this.spinner.hide()
          }
        } else {
          this.spinner.hide();
        }
      },
      error: (error: any) => {
        console.log(error);
      }
    })
    // }
  }

  validarBusquedaPersona() {
    // Verificar si no se ha seleccionado el tipo de documento (p_tdi_id)
    if (!this.p_tdi_id) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe seleccionar el tipo de documento.',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#3085d6'
      });
      return;  // Detener la ejecución si no se seleccionó el tipo de documento
    }
  
    // Validar si el número de documento (DNI) no está vacío
    let postListar = {
      p_tdi_id: this.p_tdi_id,
      p_per_numdoi: this.p_usu_numdoi
    };
    
    if (this.p_usu_numdoi != '') {
      this.spinner.show();
      this.service.listarPersona(postListar).subscribe({
        next: (data: any) => {
          console.log(data);
          if (data[0]) {
            this.per_id = data[0].per_id;
            this.p_usu_nombre = data[0].pen_nombre;
            this.p_usu_apepat = data[0].pen_apepat;
            this.p_usu_apemat = data[0].pen_apemat;
            this.spinner.hide();
          } else {
            this.buscarReniec();
          }
        },
        error: (error: any) => {
          console.error(error);
        }
      });
    }
  }
  

  guardarPersona() {

    let post = {
      p_tdi_id: this.p_tdi_id,
      p_tdi_numero: this.p_usu_numdoi,
      p_per_apepat: this.p_usu_apepat,
      p_per_apemat: this.p_usu_apemat
    };

    this.service.guardarPersona(post).subscribe({
      next: (data: any) => {
        let result = data[0];
        if (result.hasOwnProperty('error')) {
          if (result.error === 0) {
            this.per_id = result.numid;
          }
        } else {
          Swal.fire('Ocurrió un error', 'Vuelva a intentarlo', 'error')
        }
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  limpiarFormulario() {
    this.p_usu_apepat = '';
    this.p_usu_apemat = '';
    this.p_usu_nombre = '';
    this.mostrarFoto = false;
    this.p_foto = '';
  }

}
