import { Component, Inject, OnInit } from '@angular/core';
import { ParametrosService } from '../parametros.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParametroDTO } from '../dto/ParametroDTO.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { LoadingService } from 'src/app/commons/loading/loading.service';
import { MessageDisplayerService } from 'src/app/commons/message-displayer/message-displayer.service';
import { MessageType } from 'src/app/commons/message-displayer/message-type.enum';

@Component({
  selector: 'app-novo-parametro',
  templateUrl: './novo-parametro.component.html',
  styleUrls: ['./novo-parametro.component.scss']
})
export class NovoParametroComponent implements OnInit  {
  parametroDTO: ParametroDTO | undefined;
  formGroup!: FormGroup;

  constructor(
    private parametrosService: ParametrosService,
    public dialogRef: MatDialogRef<NovoParametroComponent>,
    private formBuilder: FormBuilder,
    private messageDisplayerService: MessageDisplayerService,
    private loadingService: LoadingService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){
    this.parametroDTO = data.parametroDTO;
  }

  ngOnInit(): void {
    

    this.buildForm();
  }

  buildForm() {
    const nome = this.parametroDTO?.nome;
    const valor = this.parametroDTO?.valor;
    const id = this.parametroDTO?.id;

    this.formGroup = this.formBuilder.group({
      nome: [nome, [Validators.required]],
      valor: [valor, [Validators.required]]
    });
  }
  cancelar(){
    this.dialogRef.close();
  }
  submit(){
    
    const updateParametroDTO = this.formGroup.value;
    this.parametrosService.update(this.data.id, updateParametroDTO).subscribe({
      next: resp => this.handleSuccess(resp),
      error: error => this.handleError(error),
      complete: () => this.loadingService.emit(false)
    });
    this.dialogRef.close(true);

  }

  handleSuccess(resp: Object): void {
    this.messageDisplayerService.emit({message: 'Parametro salvo com sucesso', messageType: MessageType.SUCCESS});
    this.dialogRef.close(true);
    this.loadingService.emit(false);
  }

  handleError(error: HttpErrorResponse): void {
    this.messageDisplayerService.emitError(error);
    this.loadingService.emit(false);
  }
}
