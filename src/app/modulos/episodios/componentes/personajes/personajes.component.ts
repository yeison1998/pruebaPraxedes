import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { Episodio } from 'src/app/modelos/episodio';
import { Favorito, Personaje } from 'src/app/modelos/personaje';
import { EpisodiosService } from 'src/app/servicios/episodios.service';
import { FavoritosService } from 'src/app/servicios/favoritos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-personajes',
  templateUrl: './personajes.component.html',
  styleUrls: ['./personajes.component.css']
})
export class PersonajesComponent implements OnInit {

  urlPersonajes: string[] = [];
  idEpisodio: number;
  episodio: Episodio;
  personajes: Personaje[] = [];

  constructor(
    private route: ActivatedRoute,
    private episodiosService: EpisodiosService,
    private favoritosService: FavoritosService
  ) { }

  ngOnInit(): void {
    this.obtenerParametrosUrl();
    this.obtenerTodosLosFavoritos()
  }

  obtenerParametrosUrl() {
    this.route.params
      .subscribe(params => {
        this.idEpisodio = params.id;
        this.obtenerRutaPersonajesPorEpisodio();
      });
  }

  obtenerRutaPersonajesPorEpisodio() {
    this.episodiosService.obtenerEpisodioPorId(this.idEpisodio).subscribe(resultado => {
      this.episodio = resultado;
      this.urlPersonajes = resultado.characters;
      this.obtenerPersonajes();
    });
  }

  obtenerPersonajes() {
    const personajes: Observable<Personaje>[] = [];
    this.urlPersonajes.forEach(urlPersonaje => personajes.push(this.episodiosService.obtenerPersonaje(urlPersonaje)));
    forkJoin(personajes).subscribe(personajes => {
      this.personajes = personajes;
      this.obtenerTodosLosFavoritos();
    });
  }

  cambiarEstadoFavorito(personaje: Personaje) {
    const favorito = {
      id_caracter: personaje.id,
      observaciones: "Favorito",
      usuario: localStorage.getItem('usuario') + ""
    }

    personaje.esFavorito = !personaje.esFavorito;

    if (personaje.esFavorito) {
      this.agregarFavorito(favorito);
    }
    else {
      this.borrarFavorito(personaje.id);
    }
  }

  borrarFavorito(id: number) {
    this.favoritosService.eliminarFavorito(id).subscribe(() => {
      Swal.fire({ icon: 'success', title: '', text: 'Se elimino de favoritos correctamente.', allowOutsideClick: false });
    }, error => {
      Swal.fire({ icon: 'error', title: 'Oops...', text: error.error.message, allowOutsideClick: false });
    });
  }

  agregarFavorito(favorito: Favorito) {
    this.favoritosService.agregarFavorito(favorito).subscribe(() => {
      Swal.fire({ icon: 'success', title: '', text: 'Se agrego a favoritos correctamente.', allowOutsideClick: false });
    }, error => {
      Swal.fire({ icon: 'error', title: 'Oops...', text: error.error.message, allowOutsideClick: false });
    });
  }

  obtenerTodosLosFavoritos() {
    this.favoritosService.obtenerFavoritos().subscribe(favoritos => {
      this.encontrarFavoritosEnEpisodio(favoritos);
    })
  }

  encontrarFavoritosEnEpisodio(favoritos: Favorito[]) {
    let personaje;
    favoritos.forEach(f => {
      personaje = this.personajes.find(p => p.id === f.id_caracter);
      if (personaje) {
        personaje.esFavorito = true;
      }
    });
  }
}
