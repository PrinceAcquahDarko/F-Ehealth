import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatInComponent } from '../chat-in/chat-in.component';
import { HeaderComponent } from '../header/header.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ChatInComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[
    ChatInComponent,
    HeaderComponent,
    

  ]
})
export class SharedModule { }
