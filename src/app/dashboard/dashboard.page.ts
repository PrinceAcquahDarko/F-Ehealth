import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(private menu: MenuController) { }

  ngOnInit() {
    console.log('yes')
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

  
  openFirst() {
    console.log('yest')
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

}
