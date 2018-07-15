import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { HttpUrls } from './httpUrls';

@Injectable({
    providedIn: 'root'
})
export class LoginSignupService {

    constructor(private http: HttpClient, private httpUrls: HttpUrls) { }

    addNewUser(user: any) {
        return this.http.post(this.httpUrls.addNewUserUrl, user).subscribe(res=>console.log(res));
    }
    validateLoginAttempt(user: any) {
        return this.http.post(this.httpUrls.validateLoginUrl, user).subscribe(res=>console.log(res));
    }

    verifyShit(){
        return this.http.get('http://localhost:3000/verify', { params: new HttpParams().append('a', '1') }).subscribe(res => console.log(res));
    }

}
