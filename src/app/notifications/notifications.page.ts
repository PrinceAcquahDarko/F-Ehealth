import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { ChatServiceService } from '../chat-service.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  // socket = this.cs.socket
  notifications$ = this.cs.getNotifications().pipe(
    map(x =>{
      let res = x.users;
      res.forEach(noti => {
        console.log(noti)
        console.log(noti.day)
        noti.day =  noti.day.substring(16, 21) //for time
        //for date (1,10)
      });
      return res
    } )
  )
  constructor(private cs: ChatServiceService) { }

  ngOnInit() {
      console.log('hey whats up')

  }


}
