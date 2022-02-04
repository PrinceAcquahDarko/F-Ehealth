import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import {LoginPage} from '../login/login.page'
import {WelcomePage} from '../welcome/welcome.page'
import { HomePageRoutingModule } from './home-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    HomePageRoutingModule
    
  ],
  declarations: [HomePage, LoginPage, WelcomePage]
})
export class HomePageModule {}
