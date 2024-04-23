import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MessageType } from './message-type.enum';
import { Message } from './message.interface';

@Injectable({
  providedIn: 'root'
})
export class MessageDisplayerService {

  messageSubject = new BehaviorSubject<Message | null>(null);

  constructor() { }

  emit(message: Message) {
    this.messageSubject.next(message);
  }

}
