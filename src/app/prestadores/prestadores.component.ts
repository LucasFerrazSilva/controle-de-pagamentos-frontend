import { User } from './../auth/user.interface';
import { Component, ViewChild } from '@angular/core';
import { UserStatus } from './dto/UserStatus.enum';
import { Page } from '../commons/pagination/page.interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PrestadoresService } from './prestadores.service';
import { ToolbarService } from '../toolbar/toolbar.service';
import { LoadingService } from '../commons/loading/loading.service';
import { PaginationParameters } from '../commons/pagination/pagination-parameters.interface';
import { UserPerfil } from '../auth/user-perfil.enum';
import { DialogConfirmComponent } from '../commons/dialog-confirm/dialog-confirm.component';
import { MatDialog } from '@angular/material/dialog';
import { MessageDisplayerService } from '../commons/message-displayer/message-displayer.service';
import { NovoPrestadorDialogComponent } from './novo-prestador-dialog/novo-prestador-dialog.component';
import { MessageType } from '../commons/message-displayer/message-type.enum';

@Component({
  selector: 'app-prestadores',
  templateUrl: './prestadores.component.html',
  styleUrls: ['./prestadores.component.scss']
})
export class PrestadoresComponent {
  
  allStatus = Object.keys(UserStatus);
  statusSelected = UserStatus.ATIVO;
  allPerfil = Object.keys(UserPerfil)
  perfilSelected = UserPerfil.ROLE_USER;
  page: Page<User> | undefined;
  displayedColumns: string[] = ['nome', 'email', 'perfil', 'salario', 'acoes'];
  dataSource!: MatTableDataSource<User>;
  filtros = {
    status: UserStatus.ATIVO,
    perfil: '',
    nome: '',
    email: '',
  };

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private service: PrestadoresService,
    private toolbarService: ToolbarService,
    private loadingService: LoadingService,
    private dialog: MatDialog,
    private messageDisplayerService: MessageDisplayerService
  ) {}

  ngOnInit(): void {
    this.toolbarService.emitPageName("Prestadores");
  }

  ngAfterViewInit(): void {
    this.list();
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
      error: err => console.log(err),
      complete: () => this.loadingService.emit(false)
    });
  }

  loadData(page: Page<User>) {
    this.page = page;
    this.dataSource = new MatTableDataSource(page.content);
    this.dataSource.sort = this.sort;

    this.paginator.length = page.totalElements;
    this.paginator.pageIndex = page.pageable.pageNumber;
    this.paginator.pageSize = page.pageable.pageSize;
  }

  delete(item: User){
    const message = `Tem certeza que deseja excluir o usuário ${item.nome}?`;
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
  }

  abrirDialog(user: User | null = null){
    const dialogRef = this.dialog.open(NovoPrestadorDialogComponent, { data: { user }});
    dialogRef.afterClosed().subscribe(confirmed => {
      if(confirmed) {
        this.list();
        this.messageDisplayerService.emit({message: 'Usuário salvo com sucesso', messageType: MessageType.SUCCESS});
      }
    });
  }
}
