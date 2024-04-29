import { NovoParametroDTO } from './../dto/NovoParametroDTO.interface';
import { Component, Inject, OnInit } from '@angular/core';
import { ParametrosService } from '../parametros.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-novo-parametro',
  templateUrl: './novo-parametro.component.html',
  styleUrls: ['./novo-parametro.component.scss']
})
export class NovoParametroComponent implements OnInit  {
  nome = '';
  valor = '';
  isUpdate : boolean = true;
  formGroup!: FormGroup;

  constructor(
    private parametrosService: ParametrosService,
    public dialogRef: MatDialogRef<NovoParametroComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){}

  ngOnInit(): void {
    this.isUpdate = !!this.data;
    this.buildForm();
  }

  buildForm() {
    const nome = this.data ? this.data.nome : "";
    const valor = this.data ? this.data.valor : "";

    this.formGroup = this.formBuilder.group({
      nome: [nome, [Validators.required]],
      valor: [valor, [Validators.required]]
    });
  }
  cancelar(){
    this.dialogRef.close();
  }
  onSubmit(){
    const NovoParametroDTO = this.formGroup.value;
    this.parametrosService.create(NovoParametroDTO);
    this.dialogRef.close(this.isUpdate);

  }
}
