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

@Component({
  selector: 'app-horas-extras',
  templateUrl: './horas-extras.component.html',
  styleUrls: ['./horas-extras.component.scss']
})
export class HorasExtrasComponent implements OnInit, AfterViewInit  {

  allStatus = Object.keys(HorasExtrasStatus);
  statusSelected = HorasExtrasStatus.SOLICITADO;
  page: Page<HorasExtras> | undefined;
  displayedColumns: string[] = ['user.nome', 'dataHoraInicio', 'dataHoraFim', 'descricao', 'aprovador.nome', 'status', 'acoes'];
  dataSource!: MatTableDataSource<HorasExtras>;
  inicio: Date | null = null;
  fim: Date | null = null;
  prestadores: User[] | undefined;
  aprovadores: User[] | undefined;
  filtros = {
    status: HorasExtrasStatus.SOLICITADO,
    descricao: '',
    dataInicio: '',
    dataFim: '',
    idUsuario: '',
    idAprovador: ''
  };

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private service: HorasExtrasService,
    private toolbarService: ToolbarService,
    private loadingService: LoadingService,
    private prestadoresService: PrestadoresService
  ) {}

  ngOnInit(): void {
    this.toolbarService.emitPageName("Horas extras");
    this.prestadoresService.listarPorPerfil(UserPerfil.ROLE_USER).subscribe(data => this.prestadores = data);
    this.prestadoresService.listarPorPerfil(UserPerfil.ROLE_GESTOR).subscribe(data => this.aprovadores = data);
  }

  ngAfterViewInit(): void {
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
      error: err => console.log(err),
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

}
