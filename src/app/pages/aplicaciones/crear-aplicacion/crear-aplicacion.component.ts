import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { PersonaUtils } from 'src/app/utils/persona.utils';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-aplicacion',
  templateUrl: './crear-aplicacion.component.html',
  styleUrls: ['./crear-aplicacion.component.css']
})
export class CrearAplicacionComponent implements OnInit {

  form!: FormGroup;
  p_apl_descri: string = '';
  p_apl_abrevi: string = '';
  p_apl_siglas: string = '';
  p_apl_enlace: string = '';

  constructor(private appComponent: AppComponent, private fb: FormBuilder,
    private service: UsersService, private router: Router, private route: ActivatedRoute, private personaUtils: PersonaUtils, private spinner: NgxSpinnerService) {
    this.appComponent.login = false;
  }

  ngOnInit(): void {
    this.setForm();
  }


  setForm() {
    this.form = this.fb.group({
      p_apl_descri: ['', [Validators.required]],
      p_apl_abrevi: ['', [Validators.required]],
      p_apl_siglas: ['', [Validators.required]],
      p_apl_enlace: ['', [Validators.required]],
    })
  }

  onSubmit() {
    if (this.form.valid) {
      let post = {
        p_apl_descri: this.p_apl_descri,
        p_apl_abrevi: this.p_apl_abrevi,
        p_apl_siglas: this.p_apl_siglas,
        p_apl_enlace: this.p_apl_enlace
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
          this.service.guardarAplicacion(post).subscribe({
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
  }
}
