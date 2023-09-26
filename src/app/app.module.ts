import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from '@/app-routing.module';
import {AppComponent} from './app.component';
import {MainComponent} from '@modules/main/main.component';
import {LoginComponent} from '@modules/login/login.component';
import {HeaderComponent} from '@modules/main/header/header.component';
import {FooterComponent} from '@modules/main/footer/footer.component';
import {MenuSidebarComponent} from '@modules/main/menu-sidebar/menu-sidebar.component';
import {BlankComponent} from '@pages/blank/blank.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ProfileComponent} from '@pages/profile/profile.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RegisterComponent} from '@modules/register/register.component';
import {DashboardComponent} from '@pages/dashboard/dashboard.component';
import {ToastrModule} from 'ngx-toastr';
import {MessagesComponent} from '@modules/main/header/messages/messages.component';
import {NotificationsComponent} from '@modules/main/header/notifications/notifications.component';

import {CommonModule, registerLocaleData} from '@angular/common';
import localeEn from '@angular/common/locales/en';
import {UserComponent} from '@modules/main/header/user/user.component';
import {ForgotPasswordComponent} from '@modules/forgot-password/forgot-password.component';
import {RecoverPasswordComponent} from '@modules/recover-password/recover-password.component';
import {LanguageComponent} from '@modules/main/header/language/language.component';
import {MainMenuComponent} from './pages/main-menu/main-menu.component';
import {SubMenuComponent} from './pages/main-menu/sub-menu/sub-menu.component';
import {MenuItemComponent} from './components/menu-item/menu-item.component';
import {ControlSidebarComponent} from './modules/main/control-sidebar/control-sidebar.component';
import {StoreModule} from '@ngrx/store';
import {authReducer} from './store/auth/reducer';
import {uiReducer} from './store/ui/reducer';
import {ProfabricComponentsModule} from '@profabric/angular-components';
import {SidebarSearchComponent} from './components/sidebar-search/sidebar-search.component';
import {PacientesComponent } from './pages/pacientes/pacientes.component';
import {RouterModule } from '@angular/router';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatTreeModule} from '@angular/material/tree';
import {MatNativeDateModule} from '@angular/material/core';
import { MatSort, Sort } from '@angular/material/sort';
import { DatosexpComponent } from './pages/datosexp/datosexp.component';
import { GeneralesComponent } from './pages/generales/generales.component';
import { SaludfisicaComponent } from './pages/saludfisica/saludfisica.component';
import { AntecedentesComponent } from './pages/antecedentes/antecedentes.component';
import { ProblematicaComponent } from './pages/problematica/problematica.component';
import { AnalisisfuncComponent } from './pages/analisisfunc/analisisfunc.component';
import { EvoproblemaComponent } from './pages/evoproblema/evoproblema.component';
import { LineavidaComponent } from './pages/lineavida/lineavida.component';
import { AreasconsiderarComponent } from './pages/areasconsiderar/areasconsiderar.component';
import { DiagnosticoComponent } from './pages/diagnostico/diagnostico.component';
import { FormcasoComponent } from './pages/formcaso/formcaso.component';
import { TratamientoComponent } from './pages/tratamiento/tratamiento.component';
import { IdeasirracionalesComponent } from './pages/ideasirracionales/ideasirracionales.component';
import { SesionesComponent } from './pages/sesiones/sesiones.component';
import { InformesComponent } from './pages/informes/informes.component';
import { VerinformeComponent } from './pages/verinforme/verinforme.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { FormsModule } from '@angular/forms';
import { RegpacienteComponent } from './pages/regpaciente/regpaciente.component';
import {MAT_DATE_LOCALE} from '@angular/material/core';
import {DatePipe} from '@angular/common';
import { RegsesionComponent } from './pages/regsesion/regsesion.component';
registerLocaleData(localeEn, 'en-EN');

@NgModule({
    declarations: [
        AppComponent,
        MainComponent,
        LoginComponent,
        HeaderComponent,
        FooterComponent,
        MenuSidebarComponent,
        BlankComponent,
        ProfileComponent,
        RegisterComponent,
        DashboardComponent,
        MessagesComponent,
        NotificationsComponent,
        UserComponent,
        ForgotPasswordComponent,
        RecoverPasswordComponent,
        LanguageComponent,
        MainMenuComponent,
        SubMenuComponent,
        MenuItemComponent,
        ControlSidebarComponent,
        SidebarSearchComponent,
        DatosexpComponent,
        GeneralesComponent,
        SaludfisicaComponent,
        AntecedentesComponent,
        ProblematicaComponent,
        AnalisisfuncComponent,
        EvoproblemaComponent,
        LineavidaComponent,
        AreasconsiderarComponent,
        DiagnosticoComponent,
        FormcasoComponent,
        TratamientoComponent,
        IdeasirracionalesComponent,
        SesionesComponent,
        InformesComponent,
        VerinformeComponent,
        RegpacienteComponent,
        RegsesionComponent,
        
    /*     PacientesComponent, */


    ],
    imports: [
        ProfabricComponentsModule,
        CommonModule,
        BrowserModule,
        CKEditorModule,
        FormsModule,
        StoreModule.forRoot({auth: authReducer, ui: uiReducer}),
        HttpClientModule,
        AppRoutingModule,
        ReactiveFormsModule,
        MatIconModule,
        RouterModule,
        MatIconModule,
        MatButtonModule,
        MatTabsModule,
        MatTableModule,
        MatInputModule,
        MatFormFieldModule,
        MatPaginatorModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatTreeModule,
        MatToolbarModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot({
            timeOut: 3000,
            positionClass: 'toast-top-right',
            preventDuplicates: true
        })
    ],
    providers: [{ provide: MAT_DATE_LOCALE, useValue: 'es-MX' },DatePipe],
    bootstrap: [AppComponent]
})
export class AppModule {}
