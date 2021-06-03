import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { environment } from 'src/environments/environment';
import { Credencial } from '../modelos/credenciales';
import { RespuestaLogin } from '../modelos/login';
import jwt_decode from "jwt-decode";

const ENDPOINT = `${environment.urlSeguridad}/api/SEG`;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  obtenerToken(): string {
    return localStorage.getItem('token') || "";
  }

  guardarToken(token: string): void {
    localStorage.setItem('token', token);
  }

  obtenerFechaVencimientoToken(token: string): Date | null {
    const decoded = jwt_decode<any>(token);
    if (decoded.exp === undefined) return null;

    const date = new Date(0); 
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  expiroToken(token?: string): boolean {
    if(!token) token = this.obtenerToken();
    if(!token) return true;

    const date = this.obtenerFechaVencimientoToken(token);

    if(date === null) return false;
    return !(date.valueOf() > new Date().valueOf());
  }

  iniciarSesion(credenciales: Credencial): Observable<RespuestaLogin> {
    return this.http.post<any>(ENDPOINT, credenciales).pipe(
      map(respuesta => {
        return {
          token: respuesta.token,
          usuario: respuesta.usuario.e_MAIL
        }
      }));
  }
}
