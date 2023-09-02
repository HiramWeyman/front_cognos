import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Gatekeeper } from 'gatekeeper-client-sdk';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Login } from '@/models/Login';
import { Observable, map } from 'rxjs';
import { Usuarios } from '@/models/Usuarios';

@Injectable({
    providedIn: 'root'
})
export class AppService {
    public user: any = null;
    public username: any=null;
    constructor(private http: HttpClient,private router: Router, private toastr: ToastrService) { }

    public urlEndPoint = `${environment.rutaAPI}`;

     getLogin(login: Login): Observable<Login[]> {
        // const urlEndPoint: string = `${environment.rutaAPI}/Login/`+matricula;
        return this.http.post<Usuarios>(this.urlEndPoint + '/Usuarios/login', login).pipe(
            // return this.http.get("/api/Login/"+matricula).pipe(
            map((response: any) => {
           /*      sessionStorage.Login = login.toString();
                localStorage.setItem(_TOKEN, login.toString()); */
                // sessionStorage.setItem(_TOKEN, matricula.toString());
                this.username=response.result.usuario.usr_nombre.toString()+' '+response.result.usuario.usr_paterno.toString()+' '+response.result.usuario.usr_materno.toString();
                sessionStorage.setItem('UserMail', response.result.usuario.usr_email.toString());
                sessionStorage.setItem('UserId', response.result.usuario.usr_id);
                sessionStorage.setItem('UserPerfil', response.result.usuario.usr_per_id);
                sessionStorage.setItem('UserName', this.username);
                this.user = response.result.usuario.usr_email.toString();
                console.log(response);
                console.log(response.result.usuario.usr_email);
                console.log(this.user);
                this.router.navigate(['/']);
                this.toastr.success('Login exitoso');
                return response;
               
            })
        );
    }

    Registro(usuario: Usuarios): Observable<Usuarios> {
        
        return this.http.post<Usuarios>(`${environment.rutaAPI}` + '/Usuarios/registro', usuario);
      }
      

/*     async loginByAuth({ email, password }) {
        try {
                  const token = await Gatekeeper.loginByAuth(email, password);
                 localStorage.setItem('token', token); 
              await this.getProfile(); 
            this.router.navigate(['/']);
            this.toastr.success('Login exitoso');
        } catch (error) {
            this.toastr.error(error.message);
        }
    } */

    async registerByAuth({ email, password }) {
        try {
            const token = await Gatekeeper.registerByAuth(email, password);
            localStorage.setItem('token', token);
           // await this.getProfile();
            this.router.navigate(['/']);
            this.toastr.success('Registro exitoso');
        } catch (error) {
            this.toastr.error(error.message);
        }
    }

    async loginByGoogle() {
        try {
            const token = await Gatekeeper.loginByGoogle();
            localStorage.setItem('token', token);
           // await this.getProfile();
            this.router.navigate(['/']);
            this.toastr.success('Login exitoso');
        } catch (error) {
            this.toastr.error(error.message);
        }
    }

    async registerByGoogle() {
        try {
            const token = await Gatekeeper.registerByGoogle();
            localStorage.setItem('token', token);
            //await this.getProfile();
            this.router.navigate(['/']);
            this.toastr.success('Registro exitoso');
        } catch (error) {
            this.toastr.error(error.message);
        }
    }

    async loginByFacebook() {
        try {
            const token = await Gatekeeper.loginByFacebook();
            localStorage.setItem('token', token);
            //await this.getProfile();
            this.router.navigate(['/']);
            this.toastr.success('Login exitoso');
        } catch (error) {
            this.toastr.error(error.message);
        }
    }

    async registerByFacebook() {
        try {
            const token = await Gatekeeper.registerByFacebook();
            localStorage.setItem('token', token);
           // await this.getProfile();
            this.router.navigate(['/']);
            this.toastr.success('Registro exitoso');
        } catch (error) {
            this.toastr.error(error.message);
        }
    }

    async getProfile() {
        try {
            this.user = sessionStorage.UserLogin;
            
            /* this.user = await Gatekeeper.getProfile(); */
        } catch (error) {
            this.logout();
            throw error;
        }
    } 

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('gatekeeper_token');
        this.user = null;
        this.router.navigate(['/login']);
    } 
}
