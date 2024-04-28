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

  isExpanded: boolean = true;
  itensMenu = [
    {
      icon: 'schedule',
      routerLink: '/horas-extras',
      text: 'Horas extras',
    },
    {
      icon: 'request_quote',
      routerLink: '/notas-fiscais',
      text: 'Notas fiscais'
    },
    {
      icon: 'groups',
      routerLink: '/prestadores',
      text: 'Prestadores'
    },
    {
      icon: 'tune',
      routerLink: '/parametros',
      text: 'Parâmetros'
    },
  ]

}
