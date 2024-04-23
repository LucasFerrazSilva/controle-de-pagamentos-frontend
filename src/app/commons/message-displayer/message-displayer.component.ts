import { Component } from '@angular/core';
import { MessageDisplayerService } from './message-displayer.service';
import { Observable } from 'rxjs';
import { Message } from './message.interface';

@Component({
  selector: 'app-message-displayer',
  templateUrl: './message-displayer.component.html',
  styleUrls: ['./message-displayer.component.scss']
})
export class MessageDisplayerComponent {

  message$: Observable<Message | null>;

  constructor(
    private messageDisplayerService: MessageDisplayerService
  ) {
    this.message$ = messageDisplayerService.messageSubject.asObservable();
  }

  clearMessage() {
    this.messageDisplayerService.messageSubject.next(null);
  }

}
