import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Episodio } from '../modelos/episodio';
import { Personaje } from '../modelos/personaje';
import { RickMortyResultado } from '../modelos/rick-morty-resultado';


const ENDPOINTEPISODE = `${environment.urlEpisodios}/api/episode`;

@Injectable({
  providedIn: 'root'
})
export class EpisodiosService {

  constructor(
    private http: HttpClient
  ) { }


  listarEpisodios(): Observable<RickMortyResultado<Episodio>> {
    return this.http.get<RickMortyResultado<Episodio>>(ENDPOINTEPISODE);
  }

  obtenerEpisodioPorId(id: number): Observable<Episodio> {
    const url = `${ENDPOINTEPISODE}/${id}`;
    return this.http.get<Episodio>(url);
  }

  obtenerPersonaje(urlPersonaje: string): Observable<Personaje> {
    return this.http.get<Personaje>(urlPersonaje);
  }


}
