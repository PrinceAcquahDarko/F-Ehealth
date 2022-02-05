import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatPage } from '../chat/chat.page';
import { ProfilePage } from '../profile/profile.page';
import { ProfilesPage } from '../profiles/profiles.page';

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
