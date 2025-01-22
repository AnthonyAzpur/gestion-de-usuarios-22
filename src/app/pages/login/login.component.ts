import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { ToastComponent } from 'src/app/components/toast/toast.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';

  constructor(private router: Router, private appComponent: AppComponent, private auth: AuthService, private toastComponent: ToastComponent){
    this.appComponent.login = true;
  }

  ngOnInit(){
  }

  loginUser(){
    let btnLogin = document.getElementById('btnLoginAction') as HTMLButtonElement;
    btnLogin.innerHTML = '<span class="align-items-center"><span class="spinner-border flex-shrink-0" role="status"><span class="visually-hidden">Loading...</span></span><span class="flex-grow-1 ms-2">Ingresando...</span></span>';
    btnLogin.classList.add('pe-none', 'btn-load');

    let data = {
      p_loging: 'admin',
      p_passwd: 'delunoalseis',
      p_app_id: 7
    }

    this.auth.postGetLoginUser(data).subscribe({
      next: (result: any) => {
        console.log(result);
        if(result[0].error == 0) {
          this.toastComponent.showToast('Inicio de sesión correcto.', 'success');

          // *** Almacenamos el numid del usuario (es un identificador único de sesión) ***
          localStorage.setItem('session-dashboard', result[0].numid.toString());  // Guarda el numid (ID de usuario) como el token de sesión
          localStorage.setItem('usu_id', result[0].numid.toString());  // Guarda el identificador único para la sesión

          setTimeout(() => {
            btnLogin.innerHTML = 'Ingresar';
            btnLogin.classList.remove('pe-none', 'btn-load');

            // Obtener más datos del usuario si es necesario
            const data_post = {
              p_usu_id: parseInt(result[0].numid),
              p_usu_apepat: "",
              p_usu_apemat: "",
              p_usu_nombre: "",
              p_usu_loging: ""
            };
            // *** Redirigir a la ruta principal después del login ***
            this.router.navigate(['/dashboard']);  // Asegúrate de que la ruta esté protegida por AuthGuard

          }, 2000);
        } else {
          btnLogin.innerHTML = 'Ingresar';
          btnLogin.classList.remove('pe-none', 'btn-load');
          this.toastComponent.showToast(result[0].mensa, 'info');
        }
      },
      error: (error: any) => {
        console.error(error);
        btnLogin.innerHTML = 'Ingresar';
        btnLogin.classList.remove('pe-none', 'btn-load');
        this.toastComponent.showToast('Error al iniciar sesión, intentelo nuevamente.', 'danger');
      }
    });
  }

  togglePassword(){
    let passwordInput = document.getElementById('password-input') as HTMLInputElement;
    let passwordIcon = document.getElementById('passwordEye') as HTMLSpanElement;

    if(passwordIcon.classList.contains('ri-eye-fill')){
      passwordInput.type = 'text';
      passwordIcon.classList.remove('ri-eye-fill');
      passwordIcon.classList.add('ri-eye-off-fill');
    }else{
      passwordInput.type = 'password';
      passwordIcon.classList.remove('ri-eye-off-fill');
      passwordIcon.classList.add('ri-eye-fill');
    }
  }

  goToPage(page: any){
    this.router.navigate([page]);
  }
}
