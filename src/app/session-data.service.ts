import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SessionDataService {
    userExpLevel: any;

    constructor() { }

    userData: any = {};
    userTasks: any = {};

    level_eqs = {
        zero: 0,
        one: 1,
        two: 2,
        three: 3,
        four: 4,
    };

    privileges = {
        profileImageAccess: false,
        catchPhraseAccess: false
    }

    decideUserPrivileges() {
        if (this.userData['exp_level']) {
            this.userExpLevel = this.level_eqs[this.userData['exp_level']];
            this.privileges.profileImageAccess = this.userExpLevel > 2;
            this.privileges.catchPhraseAccess = this.userExpLevel != 0;
        }
    }


}
