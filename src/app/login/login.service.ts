import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDTO } from './dto/login-dto.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { TokenDTO } from './dto/token-dto.interface';

const BACKEND_URL = environment.apiUrl;
const LOGIN_ENDPOINT = `${BACKEND_URL}/login`;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private httpClient: HttpClient
  ) { }

  login(loginDto: LoginDTO): Observable<TokenDTO> {
    return this.httpClient.post<TokenDTO>(LOGIN_ENDPOINT, loginDto);
  }

}
