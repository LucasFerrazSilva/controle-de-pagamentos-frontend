import { UpdateParametroDTO } from './../dto/updateParametroDTO.interface';
import { NovoParametroDTO } from './../dto/NovoParametroDTO.interface';
import { Component, Inject, OnInit } from '@angular/core';
import { ParametrosService } from '../parametros.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParametroDTO } from '../dto/ParametroDTO.interface';

@Component({
  selector: 'app-novo-parametro',
  templateUrl: './novo-parametro.component.html',
  styleUrls: ['./novo-parametro.component.scss']
})
export class NovoParametroComponent implements OnInit  {
  isUpdate : boolean = true;
  formGroup!: FormGroup;
  action: string = "";

  constructor(
    private parametrosService: ParametrosService,
    public dialogRef: MatDialogRef<NovoParametroComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: ParametroDTO
  ){}

  ngOnInit(): void {
    this.isUpdate = !!this.data;
    this.buildForm();
  }

  buildForm() {
    const nome = this.data ? this.data.nome : "";
    const valor = this.data ? this.data.valor : "";
    const id = this.data ? this.data.id : "";
    this.action = this.data ? "Atualizar" : "Criar";
    console.log(nome);

    this.formGroup = this.formBuilder.group({
      nome: [nome, [Validators.required]],
      valor: [valor, [Validators.required]]
    });
  }
  cancelar(){
    this.dialogRef.close();
  }
  onSubmit(){
    
    if(this.data){
      const updateParametroDTO = this.formGroup.value;
      this.parametrosService.update(this.data.id, updateParametroDTO)
    } else {
      const NovoParametroDTO = this.formGroup.value;
      this.parametrosService.create(NovoParametroDTO);
    }
    
    this.dialogRef.close(true);

  }
}
