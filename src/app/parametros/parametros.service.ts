import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingService } from '../commons/loading/loading.service';
import { TokenService } from '../auth/token.service';
import { Router } from '@angular/router';
import { MessageDisplayerService } from '../commons/message-displayer/message-displayer.service';
import { ParametroDTO } from './dto/ParametroDTO.interface';
import { environment } from 'src/environments/environment';
import { Observable, catchError, throwError } from 'rxjs';
import { MessageType } from '../commons/message-displayer/message-type.enum';

const BACKEND_URL = environment.apiUrl;
const PARAMETRO_ENDPOINT = `${BACKEND_URL}/parametros`;

@Injectable({
  providedIn: 'root'
})
export class ParametrosService {

  constructor(
    private httpClient: HttpClient,
    private loadingService: LoadingService,
    private tokenService: TokenService,
    private router: Router,
    private messageDisplayerService: MessageDisplayerService
  ) { }

  private buildHeadersWithToken() {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return headers;
  }

  getParametros(pagina: number, tamanho: number, nome: string, valor: string): Observable<{content: ParametroDTO[], totalElements: number, totalPages: number}>{
    const headers = this.buildHeadersWithToken();
    const params = new HttpParams()
      .set('page', pagina.toString())
      .set('size', tamanho.toString());

    var url = `${PARAMETRO_ENDPOINT}`;
    if (nome != ""){
      url = `${PARAMETRO_ENDPOINT}?nome=${nome}`;
    }
    return this.httpClient.get<{ content: ParametroDTO[], totalElements: number, totalPages: number }>(url , { headers, params }).pipe(
      catchError(error => this.handleError(error)));
  }


  handleError(error: HttpErrorResponse) {
    this.loadingService.emit(false);
    return throwError (() => this.messageDisplayerService.emit({message: error.error.message, messageType: MessageType.ERROR}));
  }

}
