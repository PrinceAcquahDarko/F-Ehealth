import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatInterfacePageRoutingModule } from './chat-interface-routing.module';

import { ChatInterfacePage } from './chat-interface.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatInterfacePageRoutingModule
  ],
  declarations: [ChatInterfacePage]
})
export class ChatInterfacePageModule {}
