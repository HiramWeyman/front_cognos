import {Component, OnInit} from '@angular/core';
import {AppService} from '@services/app.service';
import {DateTime} from 'luxon';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
    public user;
    public userId: any = null;
    constructor(private appService: AppService) {}

    ngOnInit(): void {
     
        this.userId=localStorage.getItem('UserId'); 
      /*   this.user = this.appService.user; */
        this.user = localStorage.getItem('UserMail');
        console.log(this.user);
    }

    logout() {
        this.appService.logout();
    }

    formatDate(date) {
        return DateTime.fromISO(date).toFormat('dd LLL yyyy');
    }
}
