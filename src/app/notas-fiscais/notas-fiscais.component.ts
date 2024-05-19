import { Component, ViewChild } from '@angular/core';
import { NotasFiscaisStatus } from './dto/notas-fiscais-status.enum';
import { NotaFiscal } from './dto/nota-fiscal.interface';
import { MatTableDataSource } from '@angular/material/table';
import { Page } from '../commons/pagination/page.interface';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { NotasFiscaisService } from './notas-fiscais.service';
import { ToolbarService } from '../toolbar/toolbar.service';
import { LoadingService } from '../commons/loading/loading.service';
import { MatDialog } from '@angular/material/dialog';
import { MessageDisplayerService } from '../commons/message-displayer/message-displayer.service';
import { TokenService } from '../auth/token.service';
import { LoginService } from '../login/login.service';
import { PaginationParameters } from '../commons/pagination/pagination-parameters.interface';
import { DialogConfirmComponent } from '../commons/dialog-confirm/dialog-confirm.component';
import { MessageType } from '../commons/message-displayer/message-type.enum';
import { PrestadoresService } from '../prestadores/prestadores.service';
import { UserPerfil } from '../auth/user-perfil.enum';
import { User } from '../auth/user.interface';
import { DialogNotasFiscaisComponent } from './dialog-notas-fiscais/dialog-notas-fiscais.component';
import { DialogEnviarNotaFiscalComponent } from './dialog-enviar-nota-fiscal/dialog-enviar-nota-fiscal.component';

@Component({
  selector: 'app-notas-fiscais',
  templateUrl: './notas-fiscais.component.html',
  styleUrls: ['./notas-fiscais.component.scss']
})
export class NotasFiscaisComponent {
    
  allStatus = Object.keys(NotasFiscaisStatus);
  statusSelected = NotasFiscaisStatus.SOLICITADA;
  userPerfil: string | undefined;
  userId: number | undefined;
  page: Page<NotaFiscal> | undefined;
  prestadores: User[] | undefined;
  displayedColumns: string[] = [];
  dataSource!: MatTableDataSource<NotaFiscal>;
  filtros = {
    idUsuario: '',
    mes: '',
    ano: '',
    valor: '',
    status: NotasFiscaisStatus.SOLICITADA,
  };
  tokenExpired = false;
  meses = [
    { nome: 'Janeiro', numero: 1 },
    { nome: 'Fevereiro', numero: 2 },
    { nome: 'Março', numero: 3 },
    { nome: 'Abril', numero: 4 },
    { nome: 'Maio', numero: 5 },
    { nome: 'Junho', numero: 6 },
    { nome: 'Julho', numero: 7 },
    { nome: 'Agosto', numero: 8 },
    { nome: 'Setembro', numero: 9 },
    { nome: 'Outubro', numero: 10 },
    { nome: 'Novembro', numero: 11 },
    { nome: 'Dezembro', numero: 12 }
  ];
  anos: number[] = [];
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private service: NotasFiscaisService,
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

    const anoAtual = new Date().getFullYear();
    this.anos = Array.from({ length: anoAtual - 1999 }, (_, i) => anoAtual - i);
    this.prestadoresService.listarPorPerfil(UserPerfil.ROLE_USER).subscribe(data => this.prestadores = data);
    this.toolbarService.emitPageName("Notas Fiscais");
    this.userPerfil = this.tokenService.getLoggedUser()?.perfil;
    this.userId = this.tokenService.getLoggedUser()?.id;
    this.buildColumns();
  }

  ngAfterViewInit(): void {
    this.list();
  }

  buildColumns() {
    this.displayedColumns = [];

    if (this.userPerfil != 'ROLE_USER')
      this.displayedColumns.push('user.nome');
    
    this.displayedColumns = this.displayedColumns.concat(['mes', 'ano', 'valor', 'status', 'acoes']);

  }

  list() {
    this.loadingService.emit(true);


    let paginationParameters: PaginationParameters = {
      size: this.paginator.pageSize,
      page: this.paginator.pageIndex,
      sort: ''
    };

    this.service.list(this.filtros, paginationParameters).subscribe({
      next: resp => this.loadData(resp),
      error: err => this.messageDisplayerService.emitError(err),
      complete: () => this.loadingService.emit(false)
    });
    
    this.buildColumns();
  }

  loadData(page: Page<NotaFiscal>) {
    this.page = page;
    this.dataSource = new MatTableDataSource(page.content);
    this.dataSource.sort = this.sort;

    this.paginator.length = page.totalElements;
    this.paginator.pageIndex = page.pageable.pageNumber;
    this.paginator.pageSize = page.pageable.pageSize;
  }

  delete(item: NotaFiscal){
    const message = `Tem certeza que deseja excluir da data ${item.mes}/${item.ano}?`;
    const dialogRef = this.dialog.open(DialogConfirmComponent, { data: { message }});
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

  handleSuccessDelete(resp: Object): void {
    this.messageDisplayerService.emit({message: 'Registro excluído com sucesso', messageType: MessageType.SUCCESS});   
    this.list();
  }

  handleErrorDelete(error: any): void {
    this.messageDisplayerService.emitError(error);
    this.loadingService.emit(false);
  }

  abrirDialog(notaFiscal: NotaFiscal | null = null) {
    if(notaFiscal) console.log(notaFiscal.userDTO.id);
    const dialogRef = this.dialog.open(DialogNotasFiscaisComponent, { data: { notaFiscal, anos: this.anos, meses: this.meses ,prestadores: this.prestadores } });
    dialogRef.afterClosed().subscribe(confirmed => {
      if(confirmed) {
        this.list();
        this.messageDisplayerService.emit({message: 'Nota Fiscal salva com sucesso', messageType: MessageType.SUCCESS});
      }
    });
  }

  marcarComoPaga(item: NotaFiscal) {
    const message = `Tem certeza que deseja marcar como paga a nota fiscal da data ${item.mes}/${item.ano} do prestador ${item.userDTO.nome}?`;
    const dialogRef = this.dialog.open(DialogConfirmComponent, { data: { message, color: 'primary' }});
    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.loadingService.emit(true);
        this.service.marcarComoPaga(item.id).subscribe({
          next: resp => this.handleSuccessDelete(resp),
          error: error => this.handleErrorDelete(error),
          complete: () => this.loadingService.emit(false)
        });
      }
    });
  }
  enviarNotaFiscal(item: NotaFiscal){
    const dialogRef = this.dialog.open(DialogEnviarNotaFiscalComponent, { data: { idNotaFiscal: item.id }});
    dialogRef.afterClosed().subscribe(confirmed =>{
      this.list();
    });
  }
  baixarNotaFiscal(item: NotaFiscal){
    this.service.baixarNotaFiscal(item.id).subscribe({
      next: resp => this.messageDisplayerService.emit({message: 'Nota Fiscal salva com sucesso', messageType: MessageType.SUCCESS}),
      error: error => this.handleErrorDelete(error),
      complete: () => this.loadingService.emit(false)
    })
  }
}
