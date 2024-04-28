import { Component } from '@angular/core';
import { LoginService } from '../login/login.service';
import { Observable } from 'rxjs';
import { TokenService } from '../auth/token.service';
import { User } from '../auth/user.interface';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  pageName = 'Nome da página';
  notifications = [
    {
      icon: 'schedule',
      text: 'Horas extras do dia 24/04 aprovadas'
    },
    {
      icon: 'request_quote',
      text: 'Pagamento do mês efetuado'
    }
  ];
  user$: Observable<User | null>;

  constructor(
    private loginService: LoginService,
    tokenService: TokenService
  ) {
    this.user$ = tokenService.getLoggedUserObservable();
  }

  logout() {
    this.loginService.logout();
  }

}
