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

@Component({
  selector: 'app-prestadores',
  templateUrl: './prestadores.component.html',
  styleUrls: ['./prestadores.component.scss']
})
export class PrestadoresComponent {
  page: Page<User> | undefined;
  displayedColumns: string[] = ['nome', 'email', 'perfil', 'salario', 'acoes'];
  dataSource!: MatTableDataSource<User>;
  filtros = {
    nome: '',
    email: '',
    perfil: '',
  };

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private service: PrestadoresService,
    private toolbarService: ToolbarService,
    private loadingService: LoadingService,
  ) {}

  ngOnInit(): void {
    this.toolbarService.emitPageName("Prestadores");
  }

  ngAfterViewInit(): void {
    this.list();
  }

  adicionarUsuario(){
    return null;
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

    this.paginator.length = page.totalElements;
    this.paginator.pageIndex = page.pageable.pageNumber;
    this.paginator.pageSize = page.pageable.pageSize;
  }

}
