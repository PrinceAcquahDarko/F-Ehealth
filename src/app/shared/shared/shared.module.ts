import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatInComponent } from '../chat-in/chat-in.component';
import { HeaderComponent } from '../header/header.component';



@NgModule({
  declarations: [
    ChatInComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    ChatInComponent,
    HeaderComponent
  ]
})
export class SharedModule { }
