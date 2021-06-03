import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarEpisodiosComponent } from './componentes/listar-episodios/listar-episodios.component';
import { PersonajesComponent } from './componentes/personajes/personajes.component';

const routes: Routes = [
  { path: '', component: ListarEpisodiosComponent },
  { path: 'listar-episodios', component: ListarEpisodiosComponent },
  { path: 'personajes/:id', component: PersonajesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EpisodiosRoutingModule { }
