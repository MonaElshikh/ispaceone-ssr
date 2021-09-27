import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from 'Shared/Services/auth.service';
import { LocalstorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGardService implements CanActivate {
  constructor(private authService: AuthService, private route: Router, private localStorage: LocalstorageService) { }
  canActivate() {
    let token = this.localStorage.getItem('token');
    console.log("token", token);
    if (token) {
      return true;
    }
    else {
      this.route.navigate(['/Login']);
      return false;
    }
  }
}
