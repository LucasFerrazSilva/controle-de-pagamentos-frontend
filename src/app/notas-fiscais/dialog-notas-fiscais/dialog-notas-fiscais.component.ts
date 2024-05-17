import { Component, Inject, OnInit } from '@angular/core';
import { NotaFiscal } from '../dto/nota-fiscal.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/auth/user.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotasFiscaisService } from '../notas-fiscais.service';
import { MessageDisplayerService } from 'src/app/commons/message-displayer/message-displayer.service';
import { LoadingService } from 'src/app/commons/loading/loading.service';
import { MessageType } from 'src/app/commons/message-displayer/message-type.enum';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-dialog-notas-fiscais',
  templateUrl: './dialog-notas-fiscais.component.html',
  styleUrls: ['./dialog-notas-fiscais.component.scss'],
})
export class DialogNotasFiscaisComponent implements OnInit {

  notaFiscal: NotaFiscal | undefined;
  formGroup!: FormGroup;
  anos: number[] | undefined;
  meses: undefined;
  prestadores!: User[];

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogNotasFiscaisComponent>,
    private service: NotasFiscaisService,
    private messageDisplayerService: MessageDisplayerService,
    private loadingService: LoadingService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.prestadores = data.prestadores;

    if (data.notaFiscal)
      this.notaFiscal = data.notaFiscal;
    this.meses = data.meses;
    this.anos = data.anos;
  }

  ngOnInit(): void {
    const idUser = this.notaFiscal ? this.notaFiscal.userDTO.id : '';
    const mes = this.notaFiscal ? this.notaFiscal.mes : '';
    const ano = this.notaFiscal ? this.notaFiscal.ano : '';
    const valor = this.notaFiscal ? this.notaFiscal.valor : '';
    const filePath = this.notaFiscal ? this.notaFiscal.filePath : '';

    this.formGroup = this.formBuilder.group({
      idUser: [idUser, Validators.required],
      mes: [mes, Validators.required],
      ano: [ano, Validators.required],
      valor: [valor, Validators.required],
      filePath: [filePath, Validators.required]
    });
  }

  submit() {
    const values = this.formGroup.getRawValue();
    
    let dto = {
      idUser: values.idUser,
      mes: values.mes,
      ano: values.ano,
      valor: values.valor,
      filePath: values.filePath
    };

    this.loadingService.emit(true);

    if (this.notaFiscal) {
      this.service.update(this.notaFiscal.id, dto).subscribe({
        next: resp => this.handleSuccess(resp),
        error: error => this.handleError(error),
        complete: () => this.loadingService.emit(false)
      });
    } else {
      this.service.create(dto).subscribe({
        next: resp => this.handleSuccess(resp),
        error: error => this.handleError(error)
      }); 
    }
  }

  handleSuccess(resp: Object): void {
    this.messageDisplayerService.emit({message: 'Nota Fiscal salva com sucesso', messageType: MessageType.SUCCESS});
    this.dialogRef.close(true);
    this.loadingService.emit(false);
  }

  handleError(error: HttpErrorResponse): void {
    this.messageDisplayerService.emitError(error);
    this.loadingService.emit(false);
  }
}
