import {
    Component,
    HostBinding,
    OnDestroy,
    OnInit,
    Renderer2
} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {AppService} from '@services/app.service';
import swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
    @HostBinding('class') class = 'login-box';
    public forgotPasswordForm: UntypedFormGroup;
    public isAuthLoading = false;
    private subscription: Subscription;
    valor:number;
    constructor(
        private renderer: Renderer2,
        private toastr: ToastrService,
        private appService: AppService
    ) {}

    ngOnInit(): void {
        this.renderer.addClass(
            document.querySelector('app-root'),
            'login-page'
        );
        this.forgotPasswordForm = new UntypedFormGroup({
            email: new UntypedFormControl(null, Validators.required)
        });
    }

    forgotPassword() {
        if (this.forgotPasswordForm.valid) {
            console.log(this.forgotPasswordForm.get('email').value)
            this.subscription = this.appService.CountUsr(this.forgotPasswordForm.get('email').value)
            .subscribe((data: any) => {
                console.log(data);
                this.valor=Number(data);
                if ( this.valor>0) {

                    this.appService.EnviarCorreo(this.forgotPasswordForm.get('email').value).subscribe(prb=>{

                        console.log(prb);
                     /*    swal.fire('Enviando Correo', `Correo Enviado Exitosamente!`, 'success'); */
                        if(prb){
                            swal.fire({
                                icon: 'success',
                                title: 'Recuperación de password',
                                text: 'Se ha enviado un email a '+this.forgotPasswordForm.get('email').value,
                                timer: 5000
                            }); 
                        }
                      },error => {
                        console.log(error);
                        //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
                      });
         
     
                } else{
                    swal.fire({
                        icon: 'error',
                        title: 'Su correo no existe o no ha sido registrado'
                    });
                }	
            },
            error => {
                console.log(error.error.errorMessages[0]);
                swal.fire({
                    title: 'ERROR!!!',
                    text: error.error.errorMessages[0],
                    icon: 'error'});
            });
              
        } else {
            swal.fire({
                icon: 'info',
                title: 'Falta capturar su correo!'
            });
            /* this.toastr.error('Su correo no existe o no ha sido registrado!', 'Toastr fun!'); */
        }
    }

    ngOnDestroy(): void {
        this.renderer.removeClass(
            document.querySelector('app-root'),
            'login-page'
        );
    }
}
