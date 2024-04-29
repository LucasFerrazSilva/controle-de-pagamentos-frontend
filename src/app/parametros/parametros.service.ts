import { NovoParametroDTO } from './dto/NovoParametroDTO.interface';
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
import { MatDialog } from '@angular/material/dialog';
import { UpdateParametroDTO } from './dto/updateParametroDTO.interface';

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
    private messageDisplayerService: MessageDisplayerService,
  ) { }

  private buildHeadersWithToken() {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return headers;
  }

  get(pagina: number, tamanho: number, nome: string, valor: string, status: string): Observable<{content: ParametroDTO[], totalElements: number, totalPages: number}>{
    const headers = this.buildHeadersWithToken();
    let params = new HttpParams()
      .set('page', pagina.toString())
      .set('size', tamanho.toString())
      .set('status', status);

    if (nome){
      params = params.set('nome', nome);
    }
    return this.httpClient.get<{ content: ParametroDTO[], totalElements: number, totalPages: number }>(PARAMETRO_ENDPOINT , { headers, params }).pipe(
      catchError(error => this.handleError(error)));
  }

  create(novoParametroDTO: NovoParametroDTO){
    const headers = this.buildHeadersWithToken();
    const req = this.httpClient.post<NovoParametroDTO>(PARAMETRO_ENDPOINT, novoParametroDTO, { headers });
    req.subscribe({
      next: data => { console.log('Parametro publicado', data.nome); this.loadingService.emit(false); },
      error: err => this.handleError(err)
    });
   }

   update(updateParametroDTO: UpdateParametroDTO){
    const headers = this.buildHeadersWithToken();
    const req = this.httpClient.put<UpdateParametroDTO>(PARAMETRO_ENDPOINT, updateParametroDTO, { headers });
    req.subscribe({
      next: data => { console.log('Parametro atualizado', data.nome); this.loadingService.emit(false); },
      error: err => this.handleError(err)
    });
   }

  delete(id: number){
    const headers = this.buildHeadersWithToken();
    const deleteUrl = `${PARAMETRO_ENDPOINT}/${id}`;
    const req = this.httpClient.delete(deleteUrl, { headers });
    req.subscribe({
      next: () => { console.log('deletado') },
      error: err => console.log('Erro ao deletar', err)
    });
  }

  handleError(error: HttpErrorResponse) {
    this.loadingService.emit(false);
    console.log(error);
    return throwError (() => this.messageDisplayerService.emit({message: error.error.message, messageType: MessageType.ERROR}));
  }

}
