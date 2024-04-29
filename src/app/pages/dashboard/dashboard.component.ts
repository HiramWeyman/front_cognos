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
        this.name=localStorage.getItem('UserName'); 
        this.userId=localStorage.getItem('UserId'); 
        console.log(localStorage.getItem('UserName'));
        if(!this.name){
            this.router.navigate(['/login']);
        }
    }
}
