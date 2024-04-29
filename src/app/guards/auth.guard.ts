import {Injectable} from '@angular/core';
import {
    CanActivate,
    CanActivateChild,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    UrlTree,
    Router
} from '@angular/router';
import {Observable} from 'rxjs';
import {AppService} from '@services/app.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(private router: Router, private appService: AppService) {}


      canActivate(): boolean {
        return this.checkLoggedIn();
      }
    
      canActivateChild(): boolean {
        return this.checkLoggedIn();
      }
      
    private checkLoggedIn(): boolean {
        if (this.appService.isAuthenticated()) {
          return true;
        } else {
          // Si la sesión está expirada, redirigir al login
          this.router.navigate(['/login']);
          return false;
        }
      }
  /*   canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        return this.getProfile();
    } */

   /*  canActivate(next: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean {
        if (this.appService.isAuthenticated()) {
          return true;
        } else {
          // Si la sesión está expirada, redirigir al login
          this.router.navigate(['/login']);
          return false;
        }
      }
    
    canActivateChild(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        return this.canActivate(next, state);
    }
 */

    

    async getProfile() {
       /*  console.log(this.appService.user+' Profile');
         if(this.appService.user==null){
            this.router.navigate(['/login']);
         } else{
            return;
         }
        if (this.appService.user) {
            return true;
        } */

      /*   try {
           // await this.appService.getProfile();
            return true;
        } catch (error) {
            return false;
        } */
    }
}
