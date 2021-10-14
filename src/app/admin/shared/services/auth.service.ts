import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { FbAuthResponse, User } from "src/app/shared/interfaces";
import { Observable, Subject, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { catchError, tap } from 'rxjs/operators'

@Injectable()
export class AuthService {
    public error$: Subject<string> = new Subject<string>();

    constructor(private http: HttpClient) { }
    
    get token(): string {
        let expDate = localStorage.getItem('fb-token-exp') || '';

        if (new Date() > new Date(expDate)) {
            this.logout();
            return '';
        }

        return localStorage.getItem('fb-token') || ''; 
    }

    login(user: User): Observable<any> {
        user.returnSecureToken = true;

        return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
            .pipe(
                tap(this.setToken),
                catchError((err: any, caught: Observable<any>) => { 
                    this.handleError(err);
                    console.log(err.error.error.message);
                    return err;
                })
            )
     }
    
    logout() { 
        this.setToken(null);
    }
    
    isAuthentication(): boolean {
        return !!this.token;
    }

    private handleError(error: HttpErrorResponse) {
        const { message } = error.error.error;

        switch(message) {
            case 'INVALID_EMAIL':
                this.error$.next('Email is not valid');
                break;
            case 'INVALID_PASSWORD':
                this.error$.next('Invalid password');
                break;
            case 'EMAIL_NOT_FOUND':
                this.error$.next('Email not found');
                break;
            default:
                this.error$.next(message);
                break;
        }
    }

    private setToken(response: FbAuthResponse | any) {
        if (response) {
            const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000);

            localStorage.setItem('fb-token', response.idToken);
            localStorage.setItem('fb-token-exp', expDate.toString());
        } else {
            localStorage.clear();
        }
    }
}
