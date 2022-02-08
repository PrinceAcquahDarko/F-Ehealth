import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatInterfacePage } from '../chat-interface/chat-interface.page';
import { ChatPage } from '../chat/chat.page';
import { NotificationsPage } from '../notifications/notifications.page';
import { ProfilePage } from '../profile/profile.page';
import { ProfilesPage } from '../profiles/profiles.page';
import { SettingsPage } from '../settings/settings.page';

import { DashboardPage } from './dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage, children: [
      {
        path: 'profiles', component: ProfilesPage
      },
      {
        path: 'profile', component: ProfilePage
      },
      {
        path: 'chat', component: ChatPage
      },
      {
        path: 'settings', component: SettingsPage
      },
      {
        path: 'interface', component: ChatInterfacePage
      },
      {
        path: 'notification', component: NotificationsPage
      },
      {
        path: '',
        redirectTo: 'profiles',
      }
    ]}
    ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule {}
