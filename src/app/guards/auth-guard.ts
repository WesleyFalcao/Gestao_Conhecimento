import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | boolean {

    const role_user = this.loginService?.Name_Role()

   
    if(route.data.b_only_admin){
      if(role_user == "trustee"){

        return true
      }else{
        this.router.navigate(['/not-allowed'])
        return false
      }

    }else{
      return true
    }
  }
}
