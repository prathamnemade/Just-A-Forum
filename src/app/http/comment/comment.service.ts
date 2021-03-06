import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { HttpUrls } from '../httpUrls';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SessionDataService } from '../../session-data.service';

@Injectable({
    providedIn: 'root'
})
export class CommentService {

    constructor(private http: HttpClient, private httpUrls: HttpUrls, private sessionData: SessionDataService) { }


    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(
            'Something bad happened; please try again later.');
    };


    addComment(data: any) {
        return this.http.post(this.httpUrls.addCommentUrl, data, { headers: { author: this.sessionData.userToken } }).pipe(catchError(this.handleError));
    }

    fetchQuestionComments(data: any) {
        return this.http.post(this.httpUrls.fetchQuestionCommentsUrl, data, { headers: { author: this.sessionData.userToken } }).pipe(catchError(this.handleError));
    }
}
