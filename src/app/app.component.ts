import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  menuOpened = true;
  loggedUser = false;

  toggleMenu() {
    this.menuOpened = !this.menuOpened;
  }

}
