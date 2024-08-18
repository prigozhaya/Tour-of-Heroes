import { Injectable } from '@angular/core';
import { Messages } from './messages/messages';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: Messages[] =[];

  add(message: Messages){
    this.messages.unshift(message)
  };

  clear() {
    this.messages = [];
  }
  constructor() { }
}
