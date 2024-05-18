import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserPerfil } from '../auth/user-perfil.enum';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User } from '../auth/user.interface';
import { PaginationParameters } from '../commons/pagination/pagination-parameters.interface';
import { Page } from '../commons/pagination/page.interface';
import { NovoParametroComponent } from '../parametros/novo-parametro/novo-parametro.component';
import { NovoUsuarioDTO } from './dto/NovoUsuarioDTO.interface';
import { UpdateUsuarioDTO } from './dto/UpdateUsuarioDTO.interface';
import { NovaSenha } from './dto/nova-senha.interface';

const API_URL = environment.apiUrl;
const ENDPOINT = API_URL + '/user';

@Injectable({
  providedIn: 'root'
})
export class PrestadoresService {

  constructor(
    private http: HttpClient
  ) { }

  listarPorPerfil(perfil: UserPerfil): Observable<User[]> {
    return this.http.get<User[]>(`${ENDPOINT}/listar-por-perfil/${perfil}`);
  }

  list(filtros: any, paginationParameters: PaginationParameters): Observable<Page<User>> {
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

    return this.http.get<Page<User>>(ENDPOINT, { params });
  }

  create(dto: NovoUsuarioDTO) {
    return this.http.post(ENDPOINT, dto);
  }

  update(id: number, dto: UpdateUsuarioDTO) {
    return this.http.put(ENDPOINT + `/${id}`, dto);
  }

  delete(id: number) {
    const endpoint = ENDPOINT + `/${id}`;
    return this.http.delete(endpoint);
  }

  mudarSenha(dto: NovaSenha){
    const endpoint = ENDPOINT + "/mudar-senha"
    return this.http.put(endpoint, dto);
  }

}
