import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EpisodiosRoutingModule } from './episodios-routing.module';
import { ListarEpisodiosComponent } from './componentes/listar-episodios/listar-episodios.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PersonajesComponent } from './componentes/personajes/personajes.component';
import { CabeceraModule } from 'src/app/componentes/cabecera/cabecera.module';


@NgModule({
  declarations: [
    ListarEpisodiosComponent,
    PersonajesComponent
  ],
  imports: [
    CommonModule,
    EpisodiosRoutingModule,
    SharedModule,
    CabeceraModule
  ]
})
export class EpisodiosModule { }
