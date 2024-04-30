import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HorasExtras } from './dto/horas-extras.interface';
import { HorasExtrasStatus } from './dto/horas-extras-status.enum';
import { NovasHorasExtras } from './dto/novas-horas-extras.interface';
import { AtualizarHorasExtras } from './dto/atualiar-horas-extras.interface';
import { Page } from '../commons/pagination/page.interface';
import { PaginationParameters } from '../commons/pagination/pagination-parameters.interface';

const API_URL = environment.apiUrl;
const ENDPOINT = API_URL + '/horas-extras';

@Injectable({
  providedIn: 'root'
})
export class HorasExtrasService {
  
  constructor(
    private http: HttpClient
  ) { }

  list(filtros: any, paginationParameters: PaginationParameters): Observable<Page<HorasExtras>> {
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

    return this.http.get<Page<HorasExtras>>(ENDPOINT, { params });
  }

  create(dto: NovasHorasExtras) {
    return this.http.post(ENDPOINT, dto);
  }

  update(id: number, dto: AtualizarHorasExtras) {
    return this.http.put(ENDPOINT + `/${id}`, dto);
  }

  delete(id: number) {
    const endpoint = ENDPOINT + `/${id}`;
    return this.http.delete(endpoint);
  }

}
