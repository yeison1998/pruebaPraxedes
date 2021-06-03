import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Usuario } from '../modelos/usuario';

const ENDPOINT = `${environment.urlPruebas}/api/SOL`;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private http: HttpClient
  ) { }

  crearUsuario(usuario: Usuario): Observable<string> {

    const httpOptions = {
      headers: new HttpHeaders({
        'MidasModulo': 'prueba'
      })
    };

    const url = `${ENDPOINT}/RegistroInicialSolicitante`;
    return this.http.post<any>(url, usuario, httpOptions).pipe(
      map(respuesta => respuesta.token)
    );
  }
}
