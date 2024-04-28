import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDTO } from './dto/login-dto.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenDTO } from './dto/token-dto.interface';
import { User } from '../auth/user.interface';
import { LoadingService } from '../commons/loading/loading.service';
import { TokenService } from '../auth/token.service';
import { Router } from '@angular/router';
import { MessageDisplayerService } from '../commons/message-displayer/message-displayer.service';
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
    if (error.error.message)
      this.messageDisplayerService.emit({message: error.error.message, messageType: MessageType.ERROR});
    else {
      error.error.forEach((err: Error) => {
        this.messageDisplayerService.emit({message: err.message, messageType: MessageType.ERROR});
      });
    }

    this.loadingService.emit(false);
  }

}