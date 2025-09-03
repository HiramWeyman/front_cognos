import { ShowMenu } from '@/models/ShowMenu';
import { AppState } from '@/store/state';
import { UiState } from '@/store/ui/state';
import { Component, HostBinding, OnInit,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppService } from '@services/app.service';
import { Observable } from 'rxjs';


const BASE_CLASSES = 'main-sidebar elevation-4';
export interface MenuItem {
    name: string;
    iconClasses: string;
    path?: string[];
    children?: MenuItem[];
    roles?: number[]; // perfiles que pueden ver este menú
}
@Component({
    selector: 'app-menu-sidebar',
    templateUrl: './menu-sidebar.component.html',
    styleUrls: ['./menu-sidebar.component.scss']
})


export class MenuSidebarComponent implements OnInit {

    @HostBinding('class') classes: string = BASE_CLASSES;

    public ui: Observable<UiState>;
    public user: string | null = null;
    public perfil: number = 0;
    public menu: MenuItem[] = [];

public userImage: string = ''; // si tienes ruta del usuario, ponla aquí
public fallbackImage: string = 'assets/img/default-profile.png';

onImageError(event: Event) {
  (event.target as HTMLImageElement).src = this.fallbackImage;
}

    constructor(
        public appService: AppService,
        private store: Store<AppState>
    ) { }

    ngOnInit() {
        this.user = localStorage.getItem('UserMail');
        this.perfil = Number(localStorage.getItem('UserPerfil'));
        console.log('Perfil ' + this.perfil);

        this.ui = this.store.select('ui');
        this.ui.subscribe((state: UiState) => {
            this.classes = `${BASE_CLASSES} ${state.sidebarSkin}`;
        });

        // Filtrar menú por rol
        this.menu = this.filterMenuByRole(MENU, this.perfil);
    }

    filterMenuByRole(menu: MenuItem[], role: number): MenuItem[] {
        return menu
            .filter(item => !item.roles || item.roles.includes(role))
            .map(item => ({
                ...item,
                children: item.children ? this.filterMenuByRole(item.children, role) : []
            }));
    }
}

// ================= MENÚ ==================
export const MENU: MenuItem[] = [
  {
    name: 'Dashboard',
    iconClasses: 'fas fa-tachometer-alt',
    path: ['/'],
    roles: [1, 2, 3,5] // todos los perfiles
  },
  {
    name: 'Pacientes',
    iconClasses: 'fas fa-folder',
    path: ['/pacientes'],
    roles: [1, 2,3,5]
  },
  {
    name: 'Reasignar Paciente',
    iconClasses: 'fas fa-users',
    path: ['/reasignar'],
    roles: [1] // solo admin
  },
  {
    name: 'Catálogos',
    iconClasses: 'fas fa-folder',
    roles: [1], // solo admin
    children: [
      {
        name: 'Padrón COGNOS',
        iconClasses: 'far fa-address-book',
        path: ['/sub-menu-1'],
        roles: [1]
      },
      {
        name: 'Cat Terapeutas',
        iconClasses: 'fas fa-users',
        path: ['/sub-menu-2'],
        roles: [1]
      }
    ]
  },
   {
    name: 'Descargar archivos',
    iconClasses: 'fas fa-folder',
    roles: [1,2,3,5], // solo admin
    children: [
      {
        name: 'Archivos de alumnos',
        iconClasses: 'far fa-address-book',
        path: ['/descalumno'],
        roles: [1,2,3]
      },
      {
        name: 'Archivos de terapeutas',
        iconClasses: 'far fa-address-book',
        path: ['/desctera'],
        roles: [1,5]
      }
    ]
  }
];


