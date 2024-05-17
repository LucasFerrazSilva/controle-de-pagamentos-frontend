import { Component } from '@angular/core';
import { LoginService } from '../login/login.service';
import { Observable } from 'rxjs';
import { TokenService } from '../auth/token.service';
import { User } from '../auth/user.interface';
import { ToolbarService } from './toolbar.service';
import { Notificacao } from './dto/notificacao.interface';
import { NotificacaoStatus } from './dto/notificacao-status.enum';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  pageName = 'Nome da página';
  notifications: Notificacao[] = [];
  user$: Observable<User | null>;
  NOTIFICACAO_VISUALIZADA = NotificacaoStatus.VISUALIZADA;
  numeroDeNotificacoes = 0;

  constructor(
    private loginService: LoginService,
    private service: ToolbarService,
    tokenService: TokenService
  ) {
    this.user$ = tokenService.getLoggedUserObservable();
    service.pageNameSubject.subscribe(pageName => this.pageName = pageName);
  }

  ngOnInit() {
    this.buscarNotificacoes();
    setInterval(() => this.buscarNotificacoes(), 10000);
  }

  buscarNotificacoes() {
    this.service.buscarNotificacoes().subscribe({
      next: resp => {
        this.notifications = resp;
        this.numeroDeNotificacoes = this.notifications.filter(notification => notification.status != this.NOTIFICACAO_VISUALIZADA).length;
      }
    });

  }

  logout() {
    this.loginService.logout();
  }

  marcarComoVisualizadas() {
    this.service.marcarComoVisualizadas().subscribe();
    this.numeroDeNotificacoes = 0;
  }

  menuNotificacoesClosed() {
    if (this.notifications) {
      this.notifications.forEach(item => item.status = this.NOTIFICACAO_VISUALIZADA);
    }
  }

}
