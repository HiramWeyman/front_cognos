import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
name:any;
    ngOnInit(): void {
        this.name=sessionStorage.getItem('UserName'); 
        console.log(sessionStorage.getItem('UserName'));
    }
}
