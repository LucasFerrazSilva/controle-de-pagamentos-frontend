import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './dialog-confirm.component.html',
  styleUrls: ['./dialog-confirm.component.scss']
})
export class DialogConfirmComponent {

  message: string;
  color: string = 'warn';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.message = data['message'];

    if (data['color'])
      this.color = data['color'];
  }
  
}
