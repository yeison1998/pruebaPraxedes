import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth-guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./modulos/login/login.module').then(m => m.LoginModule)
  },
  { path: 'usuarios', loadChildren: () => import('./modulos/usuarios/usuario.module').then(m => m.UsersModule)},
  { path: 'episodios', loadChildren: () => import('./modulos/episodios/episodios.module').then(m => m.EpisodiosModule), canLoad: [AuthGuard] },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
