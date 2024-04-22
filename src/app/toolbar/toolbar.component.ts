import { Component } from '@angular/core';
import { LoginService } from '../login/login.service';

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

  constructor(
    private loginService: LoginService
  ) {}

  logout() {
    this.loginService.logout();
  }

}
