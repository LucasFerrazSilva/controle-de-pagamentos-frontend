import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PaginationParameters } from '../commons/pagination/pagination-parameters.interface';
import { Observable } from 'rxjs';
import { Page } from '../commons/pagination/page.interface';
import { NotaFiscal } from './dto/nota-fiscal.interface';
import { NovaNotaFiscal } from './dto/nova-nota-fiscal.interface';
import { AtualizarNotaFiscal } from './dto/atualizar-nota-fiscal.interface';

@Injectable({
  providedIn: 'root'
})
const API_URL = environment.apiUrl;
const ENDPOINT = API_URL + '/horas-extras';

@Injectable({
  providedIn: 'root'
})
export class NotasFiscaisService {
  
  constructor(
    private http: HttpClient
  ) { }

  list(filtros: any, paginationParameters: PaginationParameters): Observable<Page<NotaFiscal>> {
    let params = new HttpParams({
      fromObject: {
        size: paginationParameters.size,
        page: paginationParameters.page,
        sort: paginationParameters.sort
      }
    });

    for (let filtro in filtros) {
      let valor = filtros[filtro];
      if(valor)
        params = params.set(filtro, valor);
    }

    return this.http.get<Page<NotaFiscal>>(ENDPOINT, { params });
  }

  create(dto: NovaNotaFiscal) {
    return this.http.post(ENDPOINT, dto);
  }

  update(id: number, dto: AtualizarNotaFiscal) {
    return this.http.put(ENDPOINT + `/${id}`, dto);
  }

  delete(id: number) {
    const endpoint = ENDPOINT + `/${id}`;
    return this.http.delete(endpoint);
  }

}

