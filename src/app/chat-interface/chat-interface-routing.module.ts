import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatInterfacePage } from './chat-interface.page';

const routes: Routes = [
  {
    path: '',
    component: ChatInterfacePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatInterfacePageRoutingModule {}
