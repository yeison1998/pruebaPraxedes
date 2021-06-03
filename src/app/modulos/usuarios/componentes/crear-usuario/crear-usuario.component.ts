import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/modelos/usuario';
import { AuthService } from 'src/app/servicios/auth.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-user',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {

  mostrar: boolean = true;
  formGroup: FormGroup = this.crearFormularioRegistrar();
  habilitarBotonRegistrar: boolean = true;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private authService : AuthService,
    public router: Router

  ) {
    this.crearFormularioRegistrar();
  }

  ngOnInit(): void {
  }

  crearFormularioRegistrar(): FormGroup {
    return this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      doctoIdent: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      clave: ['', Validators.required],
      cia: ['10']
    });
  }

  obtenerMensajeError() {
    if (this.email.hasError('required')) {
      return 'Este campo es requerido';
    }
    return this.email.hasError('email') ? 'El usuario no es valido' : '';
  }

  registrarse() {
    if (this.formGroup.valid) {
      const usuario = this.formGroup.value as Usuario;
      this.usuarioService.crearUsuario(usuario).subscribe(
        token => {
          this.authService.guardarToken(token);
          this.router.navigateByUrl('/episodios/listar-episodios');
        },
        (e) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: e.error.Message,
            allowOutsideClick: false
          })
        }
      );
    }
  }

  get nombre() { return this.formGroup.get('nombre') as FormControl }
  get apellido() { return this.formGroup.get('apellido') as FormControl }
  get doctoIdent() { return this.formGroup.get('doctoIdent') as FormControl }
  get email() { return this.formGroup.get('email') as FormControl }
  get clave() { return this.formGroup.get('clave') as FormControl }
}
