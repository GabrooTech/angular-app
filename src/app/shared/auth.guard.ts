import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { LoginFormService } from "../login-form/login-form.service";
import { Observable, map } from "rxjs";
 
// authentification gurad რომელიც იცავს domain field ის გამოყენებით სხვადასხვა route ებზე გადასხვლისგან საიტს
export const authGuardFn : CanActivateFn =
(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean|UrlTree> => {
    const router = inject(Router);
    const authService = inject(LoginFormService);
    return authService.user$.pipe(map( user => {
    const isAuth = !!user;
    if(isAuth) {
        return true;
    }
    return router.createUrlTree(['/login']); // ავტომატური navigation ი urltree ს გამოყენებით დაუშვებელი წვდომის შემთხვევაში იუზერს საჭირო გვერდზე გადაამისამართებს
  }));
};
export const authAdminGuardFn : CanActivateFn =
(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean|UrlTree> => {
    const router = inject(Router);
    const authService = inject(LoginFormService);
    return authService.user$.pipe(map( user => {
    const isAuth = !!user;
    if(isAuth && user.id === "1URGlX6vqWZepr9c4MLQwPi68Qx1") {
        return true;
    }
    return router.createUrlTree(['/login']); // ავტომატური navigation ი urltree ს გამოყენებით დაუშვებელი წვდომის შემთხვევაში იუზერს საჭირო გვერდზე გადაამისამართებს
  }));
};