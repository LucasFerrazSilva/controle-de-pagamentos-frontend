import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from './token.service';

export const authGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);

  if (tokenService.hasToken()) {
    const rolesAllowed: string[] = route.data['role'];
    const loggedUser = tokenService.getLoggedUser();
    if (!rolesAllowed || (loggedUser && rolesAllowed.indexOf(loggedUser.perfil) != -1))
      return true;
  }

  const router = inject(Router);
  router.navigate(['/']);
  return false;
};
