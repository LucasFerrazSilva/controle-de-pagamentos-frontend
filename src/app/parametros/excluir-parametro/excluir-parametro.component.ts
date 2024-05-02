import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-excluir-parametro',
  templateUrl: './excluir-parametro.component.html',
  styleUrls: ['./excluir-parametro.component.scss']
})
export class ExcluirParametroComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
}
