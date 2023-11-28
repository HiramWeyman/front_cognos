import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from '@modules/main/main.component';
import {BlankComponent} from '@pages/blank/blank.component';
import {LoginComponent} from '@modules/login/login.component';
import {ProfileComponent} from '@pages/profile/profile.component';
import {RegisterComponent} from '@modules/register/register.component';
import {DashboardComponent} from '@pages/dashboard/dashboard.component';
import {AuthGuard} from '@guards/auth.guard';
import {NonAuthGuard} from '@guards/non-auth.guard';
import {ForgotPasswordComponent} from '@modules/forgot-password/forgot-password.component';
import {RecoverPasswordComponent} from '@modules/recover-password/recover-password.component';
import {MainMenuComponent} from '@pages/main-menu/main-menu.component';
import {SubMenuComponent} from '@pages/main-menu/sub-menu/sub-menu.component';
import { PacientesComponent } from '@pages/pacientes/pacientes.component';
import { DatosexpComponent } from '@pages/datosexp/datosexp.component';
import { VerinformeComponent } from '@pages/verinforme/verinforme.component';
import { RegpacienteComponent } from '@pages/regpaciente/regpaciente.component';
import { RegsesionComponent } from '@pages/regsesion/regsesion.component';
import { EditsesionComponent } from '@pages/editsesion/editsesion.component';
import { RepsesionComponent } from '@pages/repsesion/repsesion.component';
import { EnviopruebasComponent } from '@pages/enviopruebas/enviopruebas.component';
import { ResultadosSCLComponent } from '@pages/resultados-scl/resultados-scl.component';

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
            {
                path: 'profile',
                component: ProfileComponent
            },
            {
                path: 'blank',
                component: BlankComponent
            },
            {
                path: 'pacientes',
                component: PacientesComponent
            },
            {
                path: 'regpaciente',
                component: RegpacienteComponent
            },
            {
                path: 'regsesion',
                component: RegsesionComponent
            },
            {
                path: 'pruebas',
                component: EnviopruebasComponent
            },
            {
                path:'editsesion/:idx', 
                component: EditsesionComponent
            },
            {
                path:'repsesion/:idx', 
                component: RepsesionComponent
            },
            {
                path:'exp/:id', 
                component: DatosexpComponent
            },
            {
                path:'verinforme/:idx', 
                component: VerinformeComponent
            },
            {
                path:'resscl/:id', 
                component: ResultadosSCLComponent
            },
            {
                path: 'sub-menu-1',
                component: SubMenuComponent
            },
            {
                path: 'sub-menu-2',
                component: BlankComponent
            },
            {
                path: '',
                component: DashboardComponent
            }
        ]
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'recover-password',
        component: RecoverPasswordComponent,
        canActivate: [NonAuthGuard]
    },
    {path: '**', redirectTo: ''}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {})],
    exports: [RouterModule]
})
export class AppRoutingModule {}
