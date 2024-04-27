import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParametroDTO } from './dto/ParametroDTO.interface';
import { ParametrosService } from './parametros.service';
import { LoadingService } from '../commons/loading/loading.service';

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
  formGroup!: FormGroup;

  constructor(
    private parametrosService: ParametrosService,
    private loadingService: LoadingService, 
    private formBuilder: FormBuilder,
  ){

  }

  ngOnInit(){
    this.getParametros(0, 10, "", "");
  }

  getParametros(pagina: number, tamanho: number, nome: string, valor: string){
    this.parametrosService.getParametros(pagina, tamanho, nome, valor).subscribe(parametros => {
      this.dataSource = parametros.content;
      this.loadingService.emit(false);
    });
  }

  onPageChange(event : any): void {
    console.log("mudou?");
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getParametros(this.pageIndex, this.pageSize, this.nome, this.valor);
  }

  onSubmit() {
    this.dataSource = [];
    console.log(this.nome);
    this.getParametros(this.pageIndex, this.pageSize, this.nome, this.valor);
  }

  editar(parametro: any) {
    
  }

  excluir(parametro: any) {
    
  }
}