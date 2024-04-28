import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HorasExtras } from './dto/horas-extras.interface';
import { HorasExtrasStatus } from './dto/horas-extras-status.enum';
import { NovasHorasExtras } from './dto/novas-horas-extras.interface';
import { AtualizarHorasExtras } from './dto/atualiar-horas-extras.interface';
import { Page } from '../commons/pagination/page.interface';

const API_URL = environment.apiUrl;
const ENDPOINT = API_URL + '/horas-extras';

@Injectable({
  providedIn: 'root'
})
export class HorasExtrasService {
  
  constructor(
    private http: HttpClient
  ) { }

  list(status: HorasExtrasStatus): Observable<Page<HorasExtras>> {
    const options = {
      params: new HttpParams({
        fromObject: {
          status
        }
      })
    };

    return this.http.get<Page<HorasExtras>>(ENDPOINT, options);
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
