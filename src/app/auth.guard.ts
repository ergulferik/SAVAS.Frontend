import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const userData = localStorage.getItem('userData');
    const isLoggedIn = !!userData;
    const user = userData ? JSON.parse(userData) : null;

    const targetUrl = state.url;

    if (targetUrl.startsWith('/admin') && (!isLoggedIn || user.role !== 'admin')) {
      this.router.navigate(['/menu']);
      return false;
    }

    if (!isLoggedIn) {

      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
