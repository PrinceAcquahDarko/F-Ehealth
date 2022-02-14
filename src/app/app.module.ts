import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { HttpInterceptorModule } from './http.interceptor';
import { GlobalErrorHandler } from './global.error.handler';
import { HomePageModule } from './home/home.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
    imports: [BrowserModule, IonicModule.forRoot(), HomePageModule, AppRoutingModule, HttpInterceptorModule,HttpClientModule ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, {provide: ErrorHandler, useClass: GlobalErrorHandler}],
  bootstrap: [AppComponent],
})
export class AppModule {}
