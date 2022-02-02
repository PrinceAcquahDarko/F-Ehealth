import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import {LoginPage} from '../login/login.page'
import {WelcomePage} from '../welcome/welcome.page'

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'login', component: LoginPage
      },
      {
        path: 'register', component: WelcomePage
      },
      {
        path: '',
        redirectTo: 'login',
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
