import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MessageType } from './message-type.enum';
import { Message } from './message.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageDisplayerService {

  messageSubject = new BehaviorSubject<Message | null>(null);

  constructor() { }

  emit(message: Message) {
    this.messageSubject.next(message);
  }

  emitError(error: HttpErrorResponse) {
    try {
      if (error.error.message)
        this.emit({message: error.error.message, messageType: MessageType.ERROR});
      else {
        error.error.forEach((err: Error) => {
          this.emit({message: err.message, messageType: MessageType.ERROR});
        });
      }
    } catch (e) {
      this.emit({message: 'Algo deu errado', messageType: MessageType.ERROR});      
    }
  }

}
