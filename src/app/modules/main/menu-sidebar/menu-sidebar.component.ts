import { ShowMenu } from '@/models/ShowMenu';
import { AppState } from '@/store/state';
import { UiState } from '@/store/ui/state';
import { Component, HostBinding, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppService } from '@services/app.service';
import { Observable } from 'rxjs';

const BASE_CLASSES = 'main-sidebar elevation-4';
@Component({
    selector: 'app-menu-sidebar',
    templateUrl: './menu-sidebar.component.html',
    styleUrls: ['./menu-sidebar.component.scss']
})
export class MenuSidebarComponent implements OnInit {
    @HostBinding('class') classes: string = BASE_CLASSES;
    public ui: Observable<UiState>;
    public user;
    perfil:number;
    public menu = MENU;
    public menu2 = MENU2;

    public x: ShowMenu[];



    constructor(
        public appService: AppService,
        private store: Store<AppState>
    ) { }

    ngOnInit() {
        this.user = localStorage.getItem('UserMail');
        this.perfil = Number(localStorage.getItem('UserPerfil'));
        console.log('Perfil ' + this.perfil);
        /* this.user = this.appService.user; */
        this.ui = this.store.select('ui');
        this.ui.subscribe((state: UiState) => {
            this.classes = `${BASE_CLASSES} ${state.sidebarSkin}`;
        });
        this.user = localStorage.getItem('UserMail');


    }
}

/* const obj = {
    name: 'Dashboard',
    iconClasses: 'fas fa-tachometer-alt',
    path: ['/']
};

const obj2 = {
    name: 'Pacientes',
    iconClasses: 'fas fa-folder',
    path: ['/pacientes']
}; */


/* export const MENU = [obj,obj2]; */

export const MENU = [
    {
        name: 'Dashboard ',
        iconClasses: 'fas fa-tachometer-alt',
        path: ['/']
    },
    {
        name: 'Pacientes ',
        iconClasses: 'fas fa-folder',
        path: ['/pacientes']
    },
    {
        name: 'Reasignar Paciente ',
        iconClasses: 'fas fa-users',
        path: ['/reasignar']
    },
    {
        name: 'Catalogos ',
        iconClasses: 'fas fa-folder',        
        children: [
            {
                name: 'Padrón COGNOS',
                iconClasses: 'far fa-address-book',
                path: ['/sub-menu-1']
            },
           {
                name: 'Cat Terapeutas',
                iconClasses: 'fas fa-users',
                path: ['/sub-menu-2']
            }
        ]
    }
];

export const MENU2 = [
    {
        name: 'Dashboard',
        iconClasses: 'fas fa-tachometer-alt',
        path: ['/']
    },
    {
        name: 'Pacientes',
        iconClasses: 'fas fa-folder',
        path: ['/pacientes']
    },
/*     {
        name: 'Catalogos',
        iconClasses: 'fas fa-folder',        
        children: [
            {
                name: 'Técnicas de Evaluación',
                iconClasses: 'far fa-address-book',
                path: ['/sub-menu-1']
            },
            {
                name: 'Tutores',
                iconClasses: 'fas fa-users',
                path: ['/sub-menu-2']
            }
        ]
    } */
];
 