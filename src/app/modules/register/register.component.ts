import { Usuarios } from '@/models/Usuarios';
import {
    Component,
    OnInit,
    Renderer2,
    OnDestroy,
    HostBinding
} from '@angular/core';
import {UntypedFormGroup, UntypedFormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {AppService} from '@services/app.service';
import {ToastrService} from 'ngx-toastr';
import { Subscription } from 'rxjs';
import swal from 'sweetalert2';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
    @HostBinding('class') class = 'register-box';

    public registerForm: UntypedFormGroup;
    public isAuthLoading = false;
    public isGoogleLoading = false;
    public isFacebookLoading = false;
    usuario:Usuarios=new Usuarios();
    private subscription: Subscription;
    constructor(
        private renderer: Renderer2,
        private toastr: ToastrService,
        private appService: AppService,
        private router: Router
    ) {}

    ngOnInit() {
        this.renderer.addClass(
            document.querySelector('app-root'),
            'register-page'
        );
        this.registerForm = new UntypedFormGroup({
            email: new UntypedFormControl(null, Validators.required),
            password: new UntypedFormControl(null, [Validators.required]),
            retypePassword: new UntypedFormControl(null, [Validators.required])
        });
        this.usuario.usr_per_id=0;
    }

    async registerByAuth() {
        if (this.registerForm.valid) {
            this.isAuthLoading = true;
            await this.appService.registerByAuth(this.registerForm.value);
            this.isAuthLoading = false;
        } else {
            this.toastr.error('Formulario no es valido!');
        }
    }

    registro() {
        this.subscription = this.appService.Registro(this.usuario)
            .subscribe((data: any) => {
                if ( data != null) {
                    console.log(data);
                    swal.fire({
                        icon: 'success',
                        title: 'Usuario Registrado',
                        text: 'Registro Exitoso ',
                        timer: 2000
                    });
                    this.router.navigate(['/login']);
                    this.toastr.success('Registro exitoso');
                } else{
                    swal.fire({
                        icon: 'error',
                        title: 'Ocurrio un error en el registro'
                    });
                }	
            },
            error => {
                //console.log(error.error.Message);
                swal.fire({
                    title: 'ERROR!!!',
                    text: error.error.Message,
                    icon: 'error'});
            });
        }

 /*    async registerByGoogle() {
        this.isGoogleLoading = true;
        await this.appService.registerByGoogle();
        this.isGoogleLoading = false;
    }

    async registerByFacebook() {
        this.isFacebookLoading = true;
        await this.appService.registerByFacebook();
        this.isFacebookLoading = false;
    } */

    ngOnDestroy() {
        this.renderer.removeClass(
            document.querySelector('app-root'),
            'register-page'
        );
    }
}
