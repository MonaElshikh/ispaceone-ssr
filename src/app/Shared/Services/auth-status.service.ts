import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from 'Shared/Services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthStatusService implements CanActivate {
  constructor(private authService: AuthService, private route: Router) { }
  canActivate() {
    if (this.authService.isLoggedIn() && this.authService.IsRejectedOrDeletedUser()) {
      this.route.navigate(['/Profile/', this.authService.getUname()], { queryParams: { suspend: '1' } });
      return false;
    }
    else {
      return true;
    }
  }
}
