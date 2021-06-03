import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { IniciarSesionComponent } from './login.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    IniciarSesionComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    LoginRoutingModule
  ]
})
export class LoginModule { }
