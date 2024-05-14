import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from './token.service';

export const authGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);
  
  if (!tokenService.hasToken()) {
    router.navigate(['/login']);
    return false;
  }

  const rolesAllowed: string[] = route.data['role'];
  const loggedUser = tokenService.getLoggedUser();
  
  if (rolesAllowed && loggedUser && rolesAllowed.indexOf(loggedUser.perfil) == -1) {
    router.navigate(['/']);
    return false;
  }

  return true;
};
