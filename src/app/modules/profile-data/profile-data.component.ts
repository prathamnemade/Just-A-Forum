import { Component, OnInit } from '@angular/core';
import { SessionDataService } from '../../session-data.service';

@Component({
    selector: 'app-profile-data',
    templateUrl: './profile-data.component.html',
    styleUrls: ['./profile-data.component.css']
})
export class ProfileDataComponent implements OnInit {
    profileData: any;

    constructor(private sessionData: SessionDataService) {
        this.profileData = sessionData.userData;
    }

    ngOnInit() {
    }

}
