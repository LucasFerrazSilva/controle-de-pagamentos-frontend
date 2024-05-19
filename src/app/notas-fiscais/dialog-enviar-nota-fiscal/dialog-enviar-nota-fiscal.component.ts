import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotasFiscaisService } from '../notas-fiscais.service';
import { MessageDisplayerService } from 'src/app/commons/message-displayer/message-displayer.service';
import { LoadingService } from 'src/app/commons/loading/loading.service';
import { MessageType } from 'src/app/commons/message-displayer/message-type.enum';

@Component({
  selector: 'app-dialog-enviar-nota-fiscal',
  templateUrl: './dialog-enviar-nota-fiscal.component.html',
  styleUrls: ['./dialog-enviar-nota-fiscal.component.scss']
})
export class DialogEnviarNotaFiscalComponent implements OnInit {
  formGroup!: FormGroup;
  selectedFile!: File;
  fileName = '';
  idNotaFiscal!: number;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogEnviarNotaFiscalComponent>,
    private service: NotasFiscaisService,
    private messageDisplayerService: MessageDisplayerService,
    private loadingService: LoadingService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    if(data.idNotaFiscal){
      this.idNotaFiscal = data.idNotaFiscal;
    }
  }


  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      fileUpload: this.formBuilder.group({
        file: [null]
      })
    });
  }

  onFileSelected(event : Event) {
    const input = event.target as HTMLInputElement;
    
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.fileName = this.selectedFile.name;
      this.formGroup.patchValue({
        fileUpload: {
          file: this.selectedFile
        }
      });
    }
  }

  submit(){
    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.loadingService.emit(true);
    
    this.service.enviarNotaFiscal(this.idNotaFiscal, formData).subscribe({
      next: resp => this.handleSuccess(resp),
      error: error => this.handleError(error),
      complete: () => this.loadingService.emit(false)
    });
  }
  
  handleSuccess(resp: Object): void {
    this.messageDisplayerService.emit({message: 'Nota Fiscal enviada com sucesso', messageType: MessageType.SUCCESS});
    this.dialogRef.close(true);
    this.loadingService.emit(false);
  }

  handleError(error: HttpErrorResponse): void {
    this.messageDisplayerService.emitError(error);
    this.loadingService.emit(false);
  }
}
