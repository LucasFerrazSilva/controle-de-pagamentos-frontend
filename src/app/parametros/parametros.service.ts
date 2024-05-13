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
import { PaginationParameters } from '../commons/pagination/pagination-parameters.interface';
import { Page } from '../commons/pagination/page.interface';

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
      if(valor)
        params = params.set(filtro, valor);
    }
    return this.httpClient.get<Page<ParametroDTO>>(PARAMETRO_ENDPOINT, { params });
  }

  create(novoParametroDTO: NovoParametroDTO){
    const req = this.httpClient.post<NovoParametroDTO>(PARAMETRO_ENDPOINT, novoParametroDTO);
    req.subscribe({
      next: data => { this.loadingService.emit(false); },
      error: err => this.handleError(err)
    });
   }

   update(id:number, updateParametroDTO: UpdateParametroDTO){
    return this.httpClient.put(`${PARAMETRO_ENDPOINT}/${id}`, updateParametroDTO);
   }
   
  delete(id: number){
    const deleteUrl = `${PARAMETRO_ENDPOINT}/${id}`;
    const req = this.httpClient.delete(deleteUrl);
    req.subscribe({
      next: () => { console.log('deletado') },
      error: err => console.log('Erro ao deletar', err)
    });
  }

  handleError(error: HttpErrorResponse) {
    this.loadingService.emit(false);
    return throwError (() => this.messageDisplayerService.emit({message: error.error.message, messageType: MessageType.ERROR}));
  }

}
