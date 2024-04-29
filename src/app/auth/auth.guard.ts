import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from './token.service';

export const authGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  console.log(route.data['role']);

  if (tokenService.hasToken())
    return true;


  const router = inject(Router);
  router.navigate(['/login']);
  return false;
};
