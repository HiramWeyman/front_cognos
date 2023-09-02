import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
name:any;
userId:any;
constructor(private router: Router){}
    ngOnInit(): void {
        this.name=sessionStorage.getItem('UserName'); 
        this.userId=sessionStorage.getItem('UserId'); 
        console.log(sessionStorage.getItem('UserName'));
        if(this.name==null||this.name==null){
            this.router.navigate(['/login']);
        }
    }
}
