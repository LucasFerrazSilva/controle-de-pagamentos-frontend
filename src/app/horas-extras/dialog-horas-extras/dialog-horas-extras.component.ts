import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HorasExtras } from '../dto/horas-extras.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/auth/user.interface';

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
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.aprovadores = data.aprovadores;

    if (data.horasExtras)
      this.horasExtras = data.horasExtras;
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      dataHoraInicio: ['', Validators.required],
      dataHoraFim: ['', Validators.required],
      descricao: ['', Validators.required],
      idAprovador: ['', Validators.required]
    });
  }

  submit() {
    console.log(this.formGroup.value);
    this.dialogRef.close(true);
  }

  calcularTotalHoras() {
    if (this.formGroup.value.dataHoraInicio && this.formGroup.value.dataHoraFim) {
      let inicio = new Date(this.formGroup.value.dataHoraInicio);
      let fim = new Date(this.formGroup.value.dataHoraFim);

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
    } else {
      this.totalHoras = '';
    }
  }
  
}
