import { Component, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { TokenService } from '../auth/token.service';
import { User } from '../auth/user.interface';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  user: User | null = null;
  isExpanded: boolean = true;
  allItensMenu = [
    {
      icon: 'schedule',
      routerLink: '/horas-extras',
      text: 'Horas extras',
      requiredRoles: []
    },
    {
      icon: 'request_quote',
      routerLink: '/notas-fiscais',
      text: 'Notas fiscais',
      requiredRoles: []
    },
    {
      icon: 'groups',
      routerLink: '/prestadores',
      text: 'Prestadores',
      requiredRoles: ['ROLE_ADMIN', 'ROLE_GESTOR', 'ROLE_FINANCEIRO']
    },
    {
      icon: 'tune',
      routerLink: '/parametros',
      text: 'Parâmetros',
      requiredRoles: ['ROLE_ADMIN', 'ROLE_GESTOR', 'ROLE_FINANCEIRO']
    },
  ]
  itensMenu: any = [];

  constructor(
    private tokenService: TokenService
  ) {}

  ngOnInit() {
    this.tokenService.getLoggedUserObservable().subscribe(user => {
      this.user = user;
      this.itensMenu = this.allItensMenu.filter(itemMenu => this.loggedUserHasRole(itemMenu.requiredRoles));
    });
  }

  loggedUserHasRole(requiredRoles: string[]): boolean {
    return requiredRoles.length == 0 || (this.user != null && requiredRoles.indexOf(this.user.perfil) != -1);
  }

}
