import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserPerfil } from '../auth/user-perfil.enum';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User } from '../auth/user.interface';

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

}
