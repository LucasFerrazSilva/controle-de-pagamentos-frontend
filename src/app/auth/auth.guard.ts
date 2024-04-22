import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from './token.service';
import { LoginService } from '../login/login.service';

export const authGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);

  if (tokenService.hasToken())
    return true;

  const router = inject(Router);
  router.navigate(['/login']);
  return false;
};
