import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PaginationComponent } from './components/pagination/pagination.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { LocalStorageService } from './services/local-storage/local-storage.service';
import { MessageService } from './services/messages/message.service';
@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [PaginationComponent, SpinnerComponent],
  exports: [PaginationComponent, SpinnerComponent],
  providers: [LocalStorageService, MessageService],
})
export class SharedModule { }