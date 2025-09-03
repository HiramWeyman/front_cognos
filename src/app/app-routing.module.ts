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
import { ResultadosBaianComponent } from '@pages/resultados-baian/resultados-baian.component';
import { ResultadosBdidpComponent } from '@pages/resultados-bdidp/resultados-bdidp.component';
import { ResultadosCreeComponent } from '@pages/resultados-cree/resultados-cree.component';
import { ResultadosScidComponent } from '@pages/resultados-scid/resultados-scid.component';
import { ResultadosIsraComponent } from '@pages/resultados-isra/resultados-isra.component';
import { RessclComponent } from '@pages/resscl/resscl.component';
import { ResScidComponent } from '@pages/res-scid/res-scid.component';
import { ResBaianComponent } from '@pages/res-baian/res-baian.component';
import { ResBdidpComponent } from '@pages/res-bdidp/res-bdidp.component';
import { ResCreeComponent } from '@pages/res-cree/res-cree.component';
import { RisraComponent } from '@pages/risra/risra.component';
import { ReasignapacComponent } from '@pages/reasignapac/reasignapac.component';
import { ArchivosanexosComponent } from '@pages/archivosanexos/archivosanexos.component';
import { DescalumnoComponent } from '@pages/descalumno/descalumno.component';
import { DescteraComponent } from '@pages/desctera/desctera.component';

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
                component: PacientesComponent,
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
                path:'rescl/:id', 
                component: RessclComponent
            },

            {
                path:'resbaian/:id', 
                component: ResultadosBaianComponent
            },
            {
                path:'rbaian/:id', 
                component: ResBaianComponent
            },
            {
                path:'resbdidp/:id', 
                component: ResultadosBdidpComponent
            },
            {
                path:'rbdidp/:id', 
                component: ResBdidpComponent
            },
            {
                path:'rescree/:id', 
                component: ResultadosCreeComponent
            },
            {
                path:'rcree/:id', 
                component: ResCreeComponent
            },
            {
                path:'resscid/:id', 
                component: ResultadosScidComponent
            },
            {
                path:'rscid/:id', 
                component: ResScidComponent
            },
            {
                path:'resisra/:id', 
                component: ResultadosIsraComponent
            },
            {
                path:'risra/:id', 
                component: RisraComponent
            },
            {
                path:'reasignar', 
                component: ReasignapacComponent
            },
            {
                path:'archivosanexos', 
                component: ArchivosanexosComponent
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
                path: 'descalumno',
                component: DescalumnoComponent
            },
             {
                path: 'desctera',
                component: DescteraComponent
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
