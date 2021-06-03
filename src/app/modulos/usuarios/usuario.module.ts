import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './usuario-routing.module';
import { CrearUsuarioComponent } from './componentes/crear-usuario/crear-usuario.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    CrearUsuarioComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
