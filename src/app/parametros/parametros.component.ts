import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, } from '@angular/forms';
import { ParametroDTO } from './dto/ParametroDTO.interface';
import { ParametrosService } from './parametros.service';
import { LoadingService } from '../commons/loading/loading.service';
import { NovoParametroComponent } from './novo-parametro/novo-parametro.component';
import { MatDialog } from '@angular/material/dialog';
import { ToolbarService } from '../toolbar/toolbar.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Page } from '../commons/pagination/page.interface';
import { PaginationParameters } from '../commons/pagination/pagination-parameters.interface';
import { MatTableDataSource } from '@angular/material/table';
import { ParametroStatus } from './dto/ParametroStatus.enum';
import { MessageDisplayerService } from '../commons/message-displayer/message-displayer.service';

@Component({
  selector: 'app-parametros',
  templateUrl: './parametros.component.html',
  styleUrls: ['./parametros.component.scss']
})
export class ParametrosComponent implements OnInit {

  page: Page<ParametroDTO>  | undefined;
  allStatus = Object.keys(ParametroStatus);
  statusSelected = ParametroStatus.ATIVO;
  dataSource!: MatTableDataSource<ParametroDTO>;
  displayedColumns: string[] = ['nome', 'valor', 'acoes'];
  status: string = 'ATIVO';
  formGroup!: FormGroup;
  filtros = { 
    nome: '',
    valor: '',
    status: ''
   };

  constructor(
    private parametrosService: ParametrosService,
    private loadingService: LoadingService, 
    private dialog: MatDialog,
    private toolbarService: ToolbarService,
    private messageDisplayerService: MessageDisplayerService,
  ){}

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(){
    this.toolbarService.emitPageName("Parametros");
  }

  ngAfterViewInit(): void {
    this.list();
  }


  list() {
    this.loadingService.emit(true);

    let paginationParameters: PaginationParameters = {
      size: this.paginator.pageSize,
      page: this.paginator.pageIndex,
      sort: ``
    };

    this.parametrosService.list(this.filtros, paginationParameters).subscribe({
      next: resp => this.loadData(resp),
      error: err => this.messageDisplayerService.emitError(err),
      complete: () => this.loadingService.emit(false)
    });
  }

  loadData(page: Page<ParametroDTO>) {
    this.page = page;
    this.dataSource = new MatTableDataSource(page.content);

    this.paginator.length = page.totalElements;
    this.paginator.pageIndex = page.pageable.pageNumber;
    this.paginator.pageSize = page.pageable.pageSize;
  }

  editar(parametroDTO: ParametroDTO) {
    let dialogRef = this.dialog.open(NovoParametroComponent, {
      data: parametroDTO
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.list();
      } 
    });
    
    
    this.list();
    
  }

}