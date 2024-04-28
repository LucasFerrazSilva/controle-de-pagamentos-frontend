import { Component } from '@angular/core';
import { ToolbarService } from '../toolbar/toolbar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(
    private toolbarService: ToolbarService
  ) {}

  ngOnInit(): void {
    this.toolbarService.emitPageName("Controle de Pagamentos");
  }

}
