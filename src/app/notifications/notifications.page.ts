import { Component, OnInit } from '@angular/core';
import { ChatServiceService } from '../chat-service.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  // socket = this.cs.socket
  constructor(private cs: ChatServiceService) { }

  ngOnInit() {
      console.log('hey whats up')

  }


}
