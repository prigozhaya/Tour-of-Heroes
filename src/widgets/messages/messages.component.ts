import { Component } from '@angular/core';
import { MessageService } from '@shared/services/messages/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss',
})
export class MessagesComponent {
  public messages = this.messageService.messages;

  constructor(public messageService: MessageService) { }

  public clearMessages(): void {
    this.messageService.clear()
  }
}
