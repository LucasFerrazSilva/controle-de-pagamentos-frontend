import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserPerfil } from 'src/app/auth/user-perfil.enum';
import { User } from 'src/app/auth/user.interface';
import { LoadingService } from 'src/app/commons/loading/loading.service';
import { MessageDisplayerService } from 'src/app/commons/message-displayer/message-displayer.service';
import { MessageType } from 'src/app/commons/message-displayer/message-type.enum';
import { PrestadoresService } from '../prestadores.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-nova-senha-dialog',
  templateUrl: './nova-senha-dialog.component.html',
  styleUrls: ['./nova-senha-dialog.component.scss']
})
export class NovaSenhaDialogComponent implements OnInit {
  formGroup!: FormGroup;
  hideSenha = true;
  hideRepeteSenha = true;
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<NovaSenhaDialogComponent>,
    private service: PrestadoresService,
    private messageDisplayerService: MessageDisplayerService,
    private loadingService: LoadingService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit(): void {
    const novaSenha = '';
    const repeteSenha = '';
      this.formGroup = this.formBuilder.group({
        novaSenha: [novaSenha, Validators.required],
        repeteSenha: [repeteSenha, Validators.required]
      }) 
    
  }

  submit() {
    const values = this.formGroup.getRawValue();
    
    if (values.novaSenha == values.repeteSenha){

      let dto = {
        novaSenha: values.novaSenha,
        repeteSenha: values.repeteSenha
      };

      this.loadingService.emit(true);

        this.service.mudarSenha(dto).subscribe({
          next: resp => this.handleSuccess(resp),
          error: error => this.handleError(error),
          complete: () => this.loadingService.emit(false)
        });
    } else {
      this.messageDisplayerService.emit({message: 'As senhas não correspondem', messageType: MessageType.WARNING});
      this.loadingService.emit(false);
    }
  }

  handleSuccess(resp: Object): void {
    this.messageDisplayerService.emit({message: 'Senha salva com sucesso', messageType: MessageType.SUCCESS});
    this.dialogRef.close(true);
    this.loadingService.emit(false);
  }

  handleError(error: HttpErrorResponse): void {
    this.messageDisplayerService.emitError(error);
    this.loadingService.emit(false);
  }
}

