import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { Observable, throwError, BehaviorSubject } from "rxjs";
import { User } from "../shared/user.model";

interface LoginFormResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered: boolean;
}

@Injectable({providedIn: 'root'})
export class LoginFormService {
    private user = new BehaviorSubject<User>(null); 
    private token_experation_timer: any
    user$ = this.user.asObservable(); // ხელმისაწვდომს ვხვდი აქ user ს

    constructor(private http: HttpClient) {}

    login(email: string, password: string): Observable<LoginFormResponseData> {
        return this.http.post<LoginFormResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB02_NxumkeWt5L1Pubh04VlWK2rerQ1GE', 
        {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(
            catchError(errorRes => {
                console.log(errorRes);
                let login_error_message = 'An unknown error occurred!';
                if(!errorRes.error || !errorRes.error.error){
                    return throwError(login_error_message);
                }
                switch (errorRes.error.error.message) {
                    case 'INVALID_LOGIN_CREDENTIALS':
                        login_error_message = 'Email or Password is Incorrect';
                        break;
                    case 'EMAIL_NOT_FOUND':
                        login_error_message = 'Email not found';
                        break;
                    case 'INVALID_PASSWORD':
                        login_error_message = 'Invalid password';
                        break;
                    case 'USER_DISABLED':
                        login_error_message = 'The user account has been disabled by an administrator';
                        break;
                    // Handle other error messages as needed
                }
                return throwError(login_error_message);
            }), 
            tap(res_data => {
                this.handle_authentification(res_data.email, res_data.localId, res_data.idToken, +res_data.expiresIn);
            })
        );
    }
    auto_login(){
      if (typeof localStorage !== 'undefined') {
        const user_data: {
          email: string,
          id: string,        
          _token: string,
          _tokenExpirationData: string
        } = JSON.parse(localStorage.getItem('user_data')); // გადამოვიტანე localstorage იდან (თუ არის ლოკალში) user data რომელსაც მივეცი parsed სახე
        
        if (!user_data){
          return;
        }
    
        const loaded_user = new User(user_data.email, user_data.id, user_data._token, new Date(user_data._tokenExpirationData));
    
        if(loaded_user.token){
          this.user.next(loaded_user);
          const expiration_date = new Date(user_data._tokenExpirationData).getTime() - new Date().getTime(); // ვითვლი რაოდენობას რამდენი წამი დამრჩა token ის ვადის გსავლამდე.
          this.auto_log_out(expiration_date);
        }
      } else {
        // Handle the case where localStorage is not available (e.g., server-side rendering)
        console.error('localStorage is not available');
      }
    }
    logout(){
      this.user.next(null)
      localStorage.removeItem('user_data') // logout ზე autologin ისთვის საჭირო იფნორმაციას ვშლი რომ არ გაიბაგოს 
      if (this.token_experation_timer){
        clearTimeout(this.token_experation_timer)
      }
      this.token_experation_timer = null
    }
    auto_log_out(experation_duration: number){ // ავტომატური logout ფუნქცია
      this.token_experation_timer = setTimeout(() => {
        this.logout();
      }, experation_duration);
    }
    private handle_authentification(email: string, userId: string, token: string, expiresIn: number){
        const expiration_date = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userId, token, expiration_date);
        this.user.next(user);
        this.auto_log_out(expiresIn * 1000) 
        localStorage.setItem('user_data', JSON.stringify(user)) // ვლოგავ აწ უკევ stringifyed user data ს localstorage ში auto_login ისთვის
    }
}