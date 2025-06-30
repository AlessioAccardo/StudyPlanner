import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
   const isLoggedIn = !!localStorage.getItem('token');
   const userLoggedIn = !!localStorage.getItem('currentUser');
   const router = inject(Router);
   if (isLoggedIn && userLoggedIn) {
    return true;
   } else {
    router.navigateByUrl('no-role');
    return false;
   }
};
