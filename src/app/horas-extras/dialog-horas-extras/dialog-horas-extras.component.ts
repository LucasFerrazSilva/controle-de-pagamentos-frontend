import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HorasExtras } from '../dto/horas-extras.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/auth/user.interface';
import { HorasExtrasService } from '../horas-extras.service';
import { AtualizarHorasExtras } from '../dto/atualiar-horas-extras.interface';
import { LoadingService } from 'src/app/commons/loading/loading.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageDisplayerService } from 'src/app/commons/message-displayer/message-displayer.service';
import { MessageType } from 'src/app/commons/message-displayer/message-type.enum';

@Component({
  selector: 'app-dialog-horas-extras',
  templateUrl: './dialog-horas-extras.component.html',
  styleUrls: ['./dialog-horas-extras.component.scss']
})
export class DialogHorasExtrasComponent implements OnInit {

  horasExtras: HorasExtras | undefined;
  formGroup!: FormGroup;
  aprovadores!: User[];
  totalHoras: string = '0';

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogHorasExtrasComponent>,
    private service: HorasExtrasService,
    private messageDisplayerService: MessageDisplayerService,
    private loadingService: LoadingService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.aprovadores = data.aprovadores;

    if (data.horasExtras)
      this.horasExtras = data.horasExtras;
  }

  ngOnInit(): void {
    const dataInicio = this.horasExtras ? new Date(this.horasExtras.dataHoraInicio) : '';
    const horaInicio = this.horasExtras ? new Date(this.horasExtras.dataHoraInicio).toLocaleTimeString() : '';
    const dataFim = this.horasExtras ? new Date(this.horasExtras.dataHoraFim) : '';
    const horaFim = this.horasExtras ? new Date(this.horasExtras.dataHoraFim).toLocaleTimeString() : '';
    const descricao = this.horasExtras ? this.horasExtras.descricao : '';
    const idAprovador = this.horasExtras ? this.horasExtras.aprovador.id : '';

    this.formGroup = this.formBuilder.group({
      dataInicio: [{value: dataInicio, disabled: true}, Validators.required],
      horaInicio: [horaInicio, Validators.required],
      dataFim: [{value: dataFim, disabled: true}, Validators.required],
      horaFim: [horaFim, Validators.required],
      descricao: [descricao],
      idAprovador: [idAprovador, Validators.required]
    });

    this.calcularTotalHoras();
  }

  submit() {
    const values = this.formGroup.getRawValue();
    
    let dto = {
      dataHoraInicio: new Date(this.calcularData(values.dataInicio, values.horaInicio).getTime() - (180 * 60000)), 
      dataHoraFim: new Date(this.calcularData(values.dataFim, values.horaFim).getTime() - (180 * 60000)), 
      descricao: values.descricao, 
      idAprovador: values.idAprovador
    };

    this.loadingService.emit(true);

    if (this.horasExtras) {
      this.service.update(this.horasExtras.id, dto).subscribe({
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

  calcularTotalHoras() {
    const values = this.formGroup.getRawValue();

    if (!values.dataInicio || !values.dataFim || !values.horaInicio || !values.horaFim) {
      this.totalHoras = '';
      return;
    }

    let inicio = this.calcularData(values.dataInicio, values.horaInicio);
    let fim = this.calcularData(values.dataFim, values.horaFim);

    if (fim < inicio)
      this.totalHoras = 'Data/hora final é anterior à data/hora inicial';
    else {
      let diff = (fim.getTime() - inicio.getTime()) / (60 * 60 * 1000);
      let horas = Math.floor(diff);
      let minutos = Math.round((diff - horas) * 60);

      this.totalHoras = '';

      if (horas)
        this.totalHoras = `${horas} hora${horas == 1 ? '' : 's'}`;

      if (horas && minutos)
        this.totalHoras += ' e ';

      if (minutos)
        this.totalHoras += `${minutos} minuto${minutos == 1 ? '' : 's'}`
    }
  }

  private calcularData(data: Date, hora: any) {
    data.setHours(0);
    data.setMinutes(0);
    
    let minutos = (hora.split(':')[0] * 3600000) + (hora.split(':')[1] * 60000);

    return new Date(data.getTime() + minutos);
  }
  
}
