import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParametroDTO } from './dto/ParametroDTO.interface';
import { ParametrosService } from './parametros.service';
import { LoadingService } from '../commons/loading/loading.service';
import { NovoParametroComponent } from './novo-parametro/novo-parametro.component';
import { MatDialog } from '@angular/material/dialog';
import { ExcluirParametroComponent } from './excluir-parametro/excluir-parametro.component';

@Component({
  selector: 'app-parametros',
  templateUrl: './parametros.component.html',
  styleUrls: ['./parametros.component.scss']
})
export class ParametrosComponent implements OnInit {

  searchQuery: string = "";
  dataSource: ParametroDTO[] = []; 
  displayedColumns: string[] = ['nome', 'valor', 'acoes'];
  totalItems: number = 100; 
  pageSize: number = 10; 
  pageSizeOptions: number[] = [5, 10, 25, 100]; 
  pageIndex: number = 0;
  nome: string = "";
  valor: string = "";
  status: string = 'ATIVO';
  formGroup!: FormGroup;

  constructor(
    private parametrosService: ParametrosService,
    private loadingService: LoadingService, 
    private dialog: MatDialog
  ){

  }

  ngOnInit(){
    this.getParametros(0, 10, "", "");
  }

  getParametros(pagina: number, tamanho: number, nome: string, valor: string){
    this.dataSource = [];
    this.parametrosService.get(pagina, tamanho, nome, valor, this.status).subscribe(parametros => {
      this.dataSource = parametros.content;
      this.loadingService.emit(false);
    });
  }

  onPageChange(event : any): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getParametros(this.pageIndex, this.pageSize, this.nome, this.valor);
  }

  onSubmit() {
      console.log(this.nome);
    this.getParametros(this.pageIndex, this.pageSize, this.nome, this.valor);
  }

  adicionarParametro(){
    let dialogRef = this.dialog.open(NovoParametroComponent, {
      height: 'auto',
      width: '40%',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.parametrosService.create(result);
        this.getParametros(this.pageIndex, this.pageSize, this.nome, this.valor);
      } 
    });
    
  }
  editar(updateParametroDTO: any) {
    let dialogRef = this.dialog.open(NovoParametroComponent, {
      height: 'auto',
      width: '40%',
      data: { updateParametroDTO },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.parametrosService.update(result);
      } 
    });
    
    
    this.getParametros(this.pageIndex, this.pageSize, this.nome, this.valor);
    
  }

  excluir(id: number) {
    const dialogRef = this.dialog.open(ExcluirParametroComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataSource = [];
        this.getParametros(this.pageIndex, this.pageSize, this.nome, this.valor);
        this.parametrosService.delete(id)
      } 
    });
    
  }

  alternarEstado(): void {
    this.status = this.status === 'ATIVO' ? 'INATIVO' : 'ATIVO';
    this.dataSource = [];
    this.getParametros(this.pageIndex, this.pageSize, this.nome, this.valor);
  }
}