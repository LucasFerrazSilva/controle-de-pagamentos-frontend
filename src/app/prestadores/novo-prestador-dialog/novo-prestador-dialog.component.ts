import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/auth/user.interface';
import { PrestadoresService } from '../prestadores.service';
import { MessageDisplayerService } from 'src/app/commons/message-displayer/message-displayer.service';
import { LoadingService } from 'src/app/commons/loading/loading.service';
import { UserPerfil } from 'src/app/auth/user-perfil.enum';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-novo-prestador-dialog',
  templateUrl: './novo-prestador-dialog.component.html',
  styleUrls: ['./novo-prestador-dialog.component.scss']
})
export class NovoPrestadorDialogComponent implements OnInit {
  user: User | undefined;
  formGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<NovoPrestadorDialogComponent>,
    private service: PrestadoresService,
    private messageDisplayerService: MessageDisplayerService,
    private loadingService: LoadingService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    const nome = this.user ? this.user.nome : '';
    const email = this.user ? this.user.email : '';
    const senha = '';
    const salario = this.user ? this.user.salario : 0;
    const perfil = this.user ? this.user.perfil : UserPerfil.ROLE_USER; 

    this.formGroup = this.formBuilder.group({
      nome: [nome, Validators.required],
      email: [email, Validators.required, Validators.email],
      senha: [senha, Validators.required],
      salario: [salario, Validators.required],
      perfil: [perfil, Validators.required],
    })
  }

  submit() {
    const values = this.formGroup.getRawValue();
    
    let dto = {
      nome: values.nome,
      email: values.email,
      senha: values.senha,
      salario: values.salario,
      perfil: values.perfil,
    };

    this.loadingService.emit(true);

    if (this.user) {
      this.service.update(this.user.id, dto).subscribe({
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
    this.messageDisplayerService.emit({message: 'Registro salvo com sucesso', messageType: MessageType.SUCCESS});
    this.dialogRef.close(true);
    this.loadingService.emit(false);
  }

  handleError(error: HttpErrorResponse): void {
    this.messageDisplayerService.emitError(error);
    this.loadingService.emit(false);
  }
}
