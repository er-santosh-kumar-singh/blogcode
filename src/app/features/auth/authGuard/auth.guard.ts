import { inject } from '@angular/core';
import { CanActivateFn , Router} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {jwtDecode} from 'jwt-decode';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const serviceCookie = inject(CookieService);
  const authSerice = inject(AuthService);
  const router = inject(Router);

  // We need to check the JWT token

  let token = serviceCookie.get('Authorization');
  let user = authSerice.getUser();
  if (!token || !user) {
    authSerice.logout();
    return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
  }

  try {
    token = token.replace('Bearer ', '');
    const decodedToken: any = jwtDecode(token);

    // Check if the token is expired
    const expirationDate = decodedToken.exp * 1000;
    const currentDate = new Date().getTime();

    if (expirationDate < currentDate) {
      authSerice.logout();
      return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
    }
    // Token is valid, check user role(s)
    if (user.roles.includes('Writer')) {
      return true;
    }
    else {
      alert('You do not have the required role to access this page...');
      return false;
    }
  }
  catch (error) {
    console.error('Invalid token', error);
    authSerice.logout();
    return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
  } 
 // return true;
};



