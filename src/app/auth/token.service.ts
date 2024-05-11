import { Injectable, OnInit } from '@angular/core';
import { TokenDTO } from '../login/dto/token-dto.interface';
import { User } from './user.interface';
import jwt_decode from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';

const TOKEN_KEY = 'token';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  loggedUserSubject!: BehaviorSubject<User | null>;

  constructor() {
    this.loggedUserSubject = new BehaviorSubject<User | null>(this.getLoggedUser())
  }

  setToken(tokenDTO: TokenDTO) {
    sessionStorage.setItem(TOKEN_KEY, tokenDTO.token);
    this.loggedUserSubject.next(this.convertTokenToUser(tokenDTO.token));
  }

  getToken(): string | null {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  hasToken(): boolean {
    return !!this.getToken();
  }

  removeToken() {
    sessionStorage.removeItem(TOKEN_KEY);
    this.loggedUserSubject.next(null);
  }

  getLoggerUserSubject() {
    return this.loggedUserSubject;
  }

  getLoggedUserObservable() {
    return this.loggedUserSubject.asObservable();
  }

  getLoggedUser(): User | null {
    const token: string | null = sessionStorage.getItem(TOKEN_KEY);
    return token ? this.convertTokenToUser(token) : null;
  }

  convertTokenToUser(token: string): User {
    const tokenDecoded: any = jwt_decode(token);
    const user: User = {
      id: tokenDecoded.id,
      nome: tokenDecoded.name,
      email: tokenDecoded.sub,
      perfil: tokenDecoded.perfil,
      salario: ''
    }
    return user;
  }

}
