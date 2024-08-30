import { Component, OnInit } from '@angular/core';
import { MessageService } from '@shared/services/messages/message.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent implements OnInit {
  public link = "/dashboard"

  constructor(
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.messageService.add({ text: `Page not found`, error: true });
  }
}
