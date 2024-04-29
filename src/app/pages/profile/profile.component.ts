import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '@services/app.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import swal from 'sweetalert2';
@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
    @BlockUI()
    blockUI!: NgBlockUI;
    name:any;
    userId:any;
    password1:string;
    password2:string;
    resp:any;
    constructor(private router: Router,private appService: AppService,){}
        ngOnInit(): void {
            this.name=localStorage.getItem('UserName'); 
            this.userId=localStorage.getItem('UserId'); 
            console.log(localStorage.getItem('UserName'));
            if(this.name==null||this.userId==null){
                this.router.navigate(['/login']);
            }
        }

        CambiarPass(){
            this.blockUI.start('Actualizando Password...');
            if(!this.password1){
                this.blockUI.stop();
                alert('Escriba nuevo password');
                return;
            }
            else if(!this.password2){
                this.blockUI.stop();
                alert('Confirme su nuevo password');
                return;
            }
            else if(this.password1!=this.password2){
                this.blockUI.stop();
                alert('Los password no coinciden');
                return;
            }
            else{
                this.appService.UpdatePass(Number(this.userId),this.password1).subscribe(dp => {
                    if(dp){
                        this.resp=dp;
                        this.blockUI.stop();
                        swal.fire('Actualizando Datos', `${this.resp.descripcion}`, 'success');
                        this.password1=null;
                        this.password2=null;
                    }
                    
                
                },error => {
                this.blockUI.stop();
                  console.log(error);
                  //swal.fire({ title: 'ERROR!!!', text: error.message, icon: 'error' });
                });
                //alert('Su password ha sido cambiado con exito '+this.userId);
            }
        }

   
}
