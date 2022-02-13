import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatInComponent } from '../chat-in/chat-in.component';
import { HeaderComponent } from '../header/header.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    ChatInComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,

  ],
  exports:[
    ChatInComponent,
    HeaderComponent,
    

  ]
})
export class SharedModule { }
