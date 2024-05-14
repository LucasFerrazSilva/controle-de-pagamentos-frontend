import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ParametroDTO } from './dto/ParametroDTO.interface';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { UpdateParametroDTO } from './dto/updateParametroDTO.interface';
import { PaginationParameters } from '../commons/pagination/pagination-parameters.interface';
import { Page } from '../commons/pagination/page.interface';

const API_URL = environment.apiUrl;
const ENDPOINT = API_URL + '/parametros';

@Injectable({
  providedIn: 'root'
})
export class ParametrosService {

  constructor(
    private http: HttpClient,
  ) { }

  list(filtros: any, paginationParameters: PaginationParameters): Observable<Page<ParametroDTO>> {
    let params = new HttpParams({
      fromObject: {
        size: paginationParameters.size,
        page: paginationParameters.page,
        sort: paginationParameters.sort
      }
    });
    for (let filtro in filtros) {
      let valor = filtros[filtro];
      if (valor)
        params = params.set(filtro, valor);
    }
    return this.http.get<Page<ParametroDTO>>(ENDPOINT, { params });
  }


  update(id: number, dto: UpdateParametroDTO) {
    return this.http.put(ENDPOINT + `/${id}`, dto);
  }

}
