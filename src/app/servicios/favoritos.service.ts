import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Favorito } from '../modelos/personaje';

const ENDPOINTFAVORITOS = `${environment.urlPruebas}/api/Favoritos`;


@Injectable({
  providedIn: 'root'
})
export class FavoritosService {
  

  constructor(
    public http: HttpClient
  ) { }

  obtenerFavoritos(): Observable<Favorito[]> {
    return this.http.get<Favorito[]>(ENDPOINTFAVORITOS);
  }

  agregarFavorito(favorito: Favorito): Observable<any> {
    return this.http.post<any>(ENDPOINTFAVORITOS, favorito);
  }

  eliminarFavorito(idNoFavoritos: number): Observable<any> {
    const httpOptions = {
      body: idNoFavoritos,
      headers: new HttpHeaders()
    };
    const url = `${ENDPOINTFAVORITOS}`;
    return this.http.delete<any>(url, httpOptions);
  }
}
