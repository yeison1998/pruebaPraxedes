import { Injectable } from '@angular/core';
import { Router, CanLoad } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';

@Injectable()
export class AuthGuard implements CanLoad {

    constructor(
        private router: Router,
        private authService: AuthService) { }

    canLoad() {
        if (!this.authService.expiroToken()) {
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }

}