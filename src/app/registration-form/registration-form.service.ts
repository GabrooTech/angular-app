import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, catchError, tap } from "rxjs";
import { throwError } from "rxjs";
import { User } from "../shared/user.model";
// დაბრუნებული data
interface RegistrationFormResponseData{
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
}

@Injectable({providedIn: 'root'})
export class RegistrationFormService {
    user = new Subject<User>()  // emitting using next
    constructor(private http: HttpClient) {}
    // signup ფუნქცია 
    signup(userName: string, email: string, password: string){
        // Using Firebase API
        return this.http.post<RegistrationFormResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB02_NxumkeWt5L1Pubh04VlWK2rerQ1GE',
        {
            email: email,
            password: password,
            returnSecureToken: true,
            userName: userName
        }).pipe(catchError(errorRes => {
            console.log(errorRes)
            let error_message = 'An unknown error occurred!';
            if(!errorRes.error || !errorRes.error.error){
                return throwError(error_message);
            }
            switch (errorRes.error.error.message){
                case 'EMAIL_EXISTS':
                    error_message = 'This email already exists';
                    break;
                case 'TOO_MANY_ATTEMPTS_TRY_LATER': 
                    error_message = 'Too many attempts, Try it later';
                    break;
            }
            return throwError(error_message);
        }), tap(res_data => {
            this.handle_authentification(res_data.email, res_data.localId, res_data.idToken, +res_data.expiresIn) // +res_data.expiresIn converting string into int
        }));
    } // tap მაძლევს საშუალებას რომ ვიმოქმედო object ზე response ის ცვლიელბის გარეშე 
    // მარტივი გამოსაყენებელი გახხდება ფუქნციურად თუ გადავაქცევ კიდევ რომ დამჭირდეს handle_authentification() (თუმცა shared folder ს არ ვაკეთებ და აზრი არ აქვს მგრამი მიანც იყოს)
    private handle_authentification(email: string, userId: string, token: string, expiresIn: number){
        const expiration_date = new Date(new Date().getTime() + expiresIn * 1000) // და ამყავს მილიწამები წამებში
        const user = new User(email, userId, token, expiration_date)
        this.user.next(user);
    }
}

