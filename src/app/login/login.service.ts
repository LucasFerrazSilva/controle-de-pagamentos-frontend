import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { TokenService } from '../auth/token.service';
import { LoadingService } from '../commons/loading/loading.service';
import { MessageDisplayerService } from '../commons/message-displayer/message-displayer.service';
import { LoginDTO } from './dto/login-dto.interface';
import { TokenDTO } from './dto/token-dto.interface';
import jwt_decode from 'jwt-decode';
import { MessageType } from '../commons/message-displayer/message-type.enum';

const BACKEND_URL = environment.apiUrl;
const LOGIN_ENDPOINT = `${BACKEND_URL}/login`;

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  constructor(
    private httpClient: HttpClient,
    private loadingService: LoadingService,
    private tokenService: TokenService,
    private router: Router,
    private messageDisplayerService: MessageDisplayerService
  ) { }

  login(loginDto: LoginDTO) {
    this.loadingService.emit(true);

    this.httpClient.post<TokenDTO>(LOGIN_ENDPOINT, loginDto).subscribe({
      next: tokenDTO => this.handleSuccess(tokenDTO),
      error: error => this.handleError(error)
    });
  }

  logout() {
    this.tokenService.removeToken();
    this.router.navigate(['/login']);
  }

  handleSuccess(tokenDTO: TokenDTO) {
    this.tokenService.setToken(tokenDTO);
    this.loadingService.emit(false);
    this.router.navigate(['']);
  }

  handleError(error: HttpErrorResponse) {
    this.messageDisplayerService.emitError(error);
    this.loadingService.emit(false);
  }

  checkTokenExpired() {
    const token = this.tokenService.getToken();
        
    if (token) {
      const tokenDecoded: any = jwt_decode(token);
      const tokenExpirado = Date.now() > tokenDecoded.exp * 1000;
      if (tokenExpirado) {
          this.loadingService.emit(false);
          this.logout();
          this.messageDisplayerService.emit({message: "Sessão expirada.", messageType: MessageType.WARNING});
          return true;
      }
    }

    return false;
  }  

}
