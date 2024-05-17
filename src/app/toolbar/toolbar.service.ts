import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Notificacao } from './dto/notificacao.interface';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {

  pageNameSubject = new BehaviorSubject<string>("Controle de Pagamentos");

  constructor(
    private http: HttpClient
  ) { }

  emitPageName(pageName: string) {
    this.pageNameSubject.next(pageName);
  }

  buscarNotificacoes() {
    return this.http.get<Notificacao[]>(API_URL + '/notificacoes');
  }

  marcarComoVisualizadas() {
    return this.http.post<Notificacao[]>(API_URL + '/notificacoes/marcar-como-visualizadas', {});
  }

}
