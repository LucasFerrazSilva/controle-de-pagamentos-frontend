import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LoadingService } from '../commons/loading/loading.service';
import { Page } from '../commons/pagination/page.interface';
import { PaginationParameters } from '../commons/pagination/pagination-parameters.interface';
import { ToolbarService } from '../toolbar/toolbar.service';
import { HorasExtrasStatus } from './dto/horas-extras-status.enum';
import { HorasExtras } from './dto/horas-extras.interface';
import { HorasExtrasService } from './horas-extras.service';
import { PrestadoresService } from '../prestadores/prestadores.service';
import { UserPerfil } from '../auth/user-perfil.enum';
import { User } from '../auth/user.interface';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmComponent } from '../commons/dialog-confirm/dialog-confirm.component';
import { MessageDisplayerService } from '../commons/message-displayer/message-displayer.service';
import { MessageType } from '../commons/message-displayer/message-type.enum';
import { DialogHorasExtrasComponent } from './dialog-horas-extras/dialog-horas-extras.component';
import { TokenService } from '../auth/token.service';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-horas-extras',
  templateUrl: './horas-extras.component.html',
  styleUrls: ['./horas-extras.component.scss']
})
export class HorasExtrasComponent implements OnInit, AfterViewInit  {

  allStatus = Object.keys(HorasExtrasStatus);
  statusSelected = HorasExtrasStatus.SOLICITADO;
  userPerfil: string | undefined;
  userId: number | undefined;
  page: Page<HorasExtras> | undefined;
  displayedColumns: string[] = ['user.nome', 'dataHoraInicio', 'dataHoraFim', 'descricao', 'aprovador.nome', 'status', 'acoes'];
  dataSource!: MatTableDataSource<HorasExtras>;
  inicio: Date | null = null;
  fim: Date | null = null;
  prestadores: User[] | undefined;
  aprovadores: User[] | undefined;
  statusAprovado = HorasExtrasStatus.APROVADO;
  statusRecusado = HorasExtrasStatus.RECUSADO;
  filtros = {
    status: HorasExtrasStatus.SOLICITADO,
    descricao: '',
    dataInicio: '',
    dataFim: '',
    idUsuario: '',
    idAprovador: ''
  };
  tokenExpired = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private service: HorasExtrasService,
    private toolbarService: ToolbarService,
    private loadingService: LoadingService,
    private dialog: MatDialog,
    private prestadoresService: PrestadoresService,
    private messageDisplayerService: MessageDisplayerService,
    private tokenService: TokenService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.tokenExpired = this.loginService.checkTokenExpired();
    if (this.tokenExpired)
      return;

    this.toolbarService.emitPageName("Horas extras");
    this.prestadoresService.listarPorPerfil(UserPerfil.ROLE_USER).subscribe(data => this.prestadores = data);
    this.prestadoresService.listarPorPerfil(UserPerfil.ROLE_GESTOR).subscribe(data => this.aprovadores = data);
    this.userPerfil = this.tokenService.getLoggedUser()?.perfil;
    this.userId = this.tokenService.getLoggedUser()?.id;
    this.displayedColumns = this.userPerfil != 'ROLE_USER'? ['user.nome', 'dataHoraInicio', 'dataHoraFim', 'descricao', 'aprovador.nome', 'status', 'acoes'] : ['dataHoraInicio', 'dataHoraFim', 'descricao', 'aprovador.nome', 'status', 'acoes'];
  }

  ngAfterViewInit(): void {
    if (this.tokenExpired)
      return;

    this.list();
  }

  list() {
    this.loadingService.emit(true);

    this.filtros.dataInicio = this.inicio? this.inicio.toLocaleDateString('pt-BR') : '';
    this.filtros.dataFim = this.fim? this.fim.toLocaleDateString('pt-BR') : '';

    let paginationParameters: PaginationParameters = {
      size: this.paginator.pageSize,
      page: this.paginator.pageIndex,
      sort: `${this.sort.active},${this.sort.direction}`
    };

    this.service.list(this.filtros, paginationParameters).subscribe({
      next: resp => this.loadData(resp),
      error: err => this.messageDisplayerService.emitError(err),
      complete: () => this.loadingService.emit(false)
    });
  }

  loadData(page: Page<HorasExtras>) {
    this.page = page;
    this.dataSource = new MatTableDataSource(page.content);

    this.paginator.length = page.totalElements;
    this.paginator.pageIndex = page.pageable.pageNumber;
    this.paginator.pageSize = page.pageable.pageSize;
  }

  delete(item: HorasExtras) {
    const message = `Tem certeza que deseja excluir o registro do dia ${new Date(item.dataHoraInicio).toLocaleDateString('pt-BR')}?`;
    const dialogRef = this.dialog.open(DialogConfirmComponent, { data: { message } });
    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.loadingService.emit(true);
        this.service.delete(item.id).subscribe({
          next: resp => this.handleSuccessDelete(resp),
          error: error => this.handleErrorDelete(error),
          complete: () => this.loadingService.emit(false)
        });
      }
    });
  }

  avaliar(item: HorasExtras, status: HorasExtrasStatus){
    this.loadingService.emit(true);
    let dto = {
      id: item.id,
      status: status
    }

    this.service.avaliar(dto).subscribe({
      next: resp => this.handleSuccessAvaliation(resp),
      error: error => this.messageDisplayerService.emitError(error),
      complete: () => this.loadingService.emit(false)
    });
  }

  handleSuccessAvaliation(resp:Object): void{
    this.messageDisplayerService.emit({message: "Registro avaliado com sucesso", messageType: MessageType.SUCCESS});   
    this.list();
  }


  handleSuccessDelete(resp: Object): void {
    this.messageDisplayerService.emit({message: 'Registro excluído com sucesso', messageType: MessageType.SUCCESS});   
    this.list();
  }

  handleErrorDelete(error: any): void {
    this.messageDisplayerService.emitError(error);
  }

  abrirDialog(horasExtras: HorasExtras | null = null) {
    const dialogRef = this.dialog.open(DialogHorasExtrasComponent, { data: { horasExtras, aprovadores: this.aprovadores } });
    dialogRef.afterClosed().subscribe(confirmed => {
      if(confirmed) {
        this.list();
        this.messageDisplayerService.emit({message: 'Registro salvo com sucesso', messageType: MessageType.SUCCESS});
      }
    });
  }

}
