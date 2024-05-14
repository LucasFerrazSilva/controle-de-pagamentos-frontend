import { Component } from '@angular/core';
import { ToolbarService } from '../toolbar/toolbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(
    private toolbarService: ToolbarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.router.navigate(['/horas-extras']);
    this.toolbarService.emitPageName("Controle de Pagamentos");    
  }

}
