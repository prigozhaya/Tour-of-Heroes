import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { MessagesComponent } from './messages.component';
@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [MessagesComponent],
  exports: [MessagesComponent],
})
export class MessagesModule { }