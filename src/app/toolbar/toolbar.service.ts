import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {

  pageNameSubject = new BehaviorSubject<string>("Controle de Pagamentos");

  constructor() { }

  emitPageName(pageName: string) {
    this.pageNameSubject.next(pageName);
  }

}
