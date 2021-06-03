import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Credencial } from 'src/app/modelos/credenciales';
import { AuthService } from 'src/app/servicios/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class IniciarSesionComponent implements OnInit {

  mostrar: boolean = true;
  formGroup: FormGroup = this.crearFormularioInicioSesion();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    public router: Router
  ) {
    this.crearFormularioInicioSesion();
  }

  ngOnInit(): void {
  }

  crearFormularioInicioSesion(): FormGroup {
    return this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      companyId: ['10'],
      desdeMs: true
    })
  }

  iniciarSesion(){
    const credenciales = this.formGroup.value as Credencial;
    this.authService.iniciarSesion(credenciales).subscribe(respuesta => {
      localStorage.setItem('usuario', respuesta.usuario);
      localStorage.setItem('token', respuesta.token);
      this.router.navigateByUrl('/episodios/listar-episodios');
    }, (e)=>{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: e.error.message,
        allowOutsideClick: false
      })
    }
    );
  }

  obtenerMensajeError() {
    if (this.username.hasError('required')) {
      return 'Este campo es requerido';
    }

    return this.username.hasError('username') ? 'El usuario no es valido' : '';
  }

  get username() { return this.formGroup.get('username') as FormControl }
  get password() { return this.formGroup.get('password') as FormControl }

}
