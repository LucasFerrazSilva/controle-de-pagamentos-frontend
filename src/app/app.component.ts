import { Component } from '@angular/core';
import { TokenService } from './auth/token.service';
import { User } from './auth/user.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  menuOpened = true;
  user$: Observable<User | null>;

  constructor(
    tokenService: TokenService
  ) {
    this.user$ = tokenService.getLoggedUserObservable();
  }

  toggleMenu() {
    this.menuOpened = !this.menuOpened;
  }

}
