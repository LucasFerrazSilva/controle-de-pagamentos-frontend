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

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private service: HorasExtrasService,
    private toolbarService: ToolbarService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.toolbarService.emitPageName("Horas extras");
  }

  ngAfterViewInit(): void {
    this.list();
    this.paginator.page.subscribe(() => this.list());
  }

  list() {
    console.log(this.paginator);
    console.log(this.sort);
    this.loadingService.emit(true);

    let paginationParameters: PaginationParameters = {
      size: this.paginator.pageSize,
      page: this.paginator.pageIndex,
      sort: `${this.sort.active},${this.sort.direction}`
    };

    console.log(paginationParameters);

    this.service.list(this.statusSelected, paginationParameters).subscribe({
      next: resp => this.loadData(resp),
      error: err => console.log(err),
      complete: () => this.loadingService.emit(false)
    });
  }

  loadData(page: Page<HorasExtras>) {
    console.log(page);
    this.page = page;
    this.dataSource = new MatTableDataSource(page.content);

    this.paginator.length = page.totalElements;
    this.paginator.pageIndex = page.pageable.pageNumber;
    this.paginator.pageSize = page.pageable.pageSize;
    
  }

}
