import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Messages } from '../../model/messages';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  public messages = new BehaviorSubject<Messages[]>([]);

  public add(message: Messages) {
    this.messages.next([message].concat(this.messages.getValue()));
  };

  public clear() {
    this.messages.next([]);
  }
  constructor() { }
}
