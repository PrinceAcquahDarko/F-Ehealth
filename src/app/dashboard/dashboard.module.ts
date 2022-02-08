import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { SettingsPage } from '../settings/settings.page';

import { DashboardPageRoutingModule } from './dashboard-routing.module';
import { ChatPage } from '../chat/chat.page';
import { ProfilePage } from '../profile/profile.page';
import { ProfilesPage } from '../profiles/profiles.page';
import { DashboardPage } from './dashboard.page';
import { SharedModule } from '../shared/shared/shared.module';
import { ChatInterfacePage } from '../chat-interface/chat-interface.page';
import { NotificationsPage } from '../notifications/notifications.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule,
    SharedModule
  ],
  declarations: [DashboardPage, ChatPage, ProfilesPage, ProfilePage, SettingsPage, ChatInterfacePage, NotificationsPage],
})
export class DashboardPageModule {}
