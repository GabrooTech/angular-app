// import { HttpClient } from "@angular/common/http";
// import { Injectable } from "@angular/core";
// import { catchError, tap } from "rxjs/operators";
// import { Observable, throwError, Subject } from "rxjs";
// import { User } from "../shared/user.model";
// // დაბრუნებული data
// interface LoginFormResponseData {
//     idToken: string;
//     email: string;
//     refreshToken: string;
//     expiresIn: string;
//     localId: string;
//     registered: boolean;
// }

// @Injectable({providedIn: 'root'})
// export class LoginFormService {
//     user = new Subject<User>()
//     constructor(private http: HttpClient) {}

//     // login ფუნქცია
//     login(email: string, password: string): Observable<LoginFormResponseData> {
//         return this.http.post<LoginFormResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB02_NxumkeWt5L1Pubh04VlWK2rerQ1GE', 
//         {
//             email: email,
//             password: password,
//             returnSecureToken: true
//         }).pipe(
//             catchError(errorRes => {
//               console.log(errorRes)
//                 let login_error_message = 'An unknown error occurred!';
//                 if(!errorRes.error || !errorRes.error.error){
//                   return throwError(login_error_message);
//                 }
//                 switch (errorRes.error.error.message) {
//                     case 'INVALID_LOGIN_CREDENTIALS':
//                       login_error_message = 'Email or Password is Incorrect'
//                         break;
//                     case 'EMAIL_NOT_FOUND':
//                       login_error_message = 'Email not found';
//                         break;
//                     case 'INVALID_PASSWORD':
//                       login_error_message = 'Invalid password';
//                         break;
//                     case 'USER_DISABLED':
//                       login_error_message = 'The user account has been disabled by an administrator';
//                         break;
//                     // Handle other error messages as needed
//                 }
//                 return throwError(login_error_message);
//             }), tap(res_data => {
//               this.handle_authentification(res_data.email, res_data.localId, res_data.idToken, +res_data.expiresIn) // +res_data.expiresIn --- converting string into int
//           })
//         );
//     }
//     private handle_authentification(email: string, userId: string, token: string, expiresIn: number){
//       const expiration_date = new Date(new Date().getTime() + expiresIn * 1000) // და ამყავს მილიწამები წამებში
//       const user = new User(email, userId, token, expiration_date)
//       this.user.next(user);
//   }
// }