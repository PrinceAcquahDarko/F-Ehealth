import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatServiceService } from '../chat-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userList  = []
  user = this.router.getCurrentNavigation().extras.state
  socket = this.cs.socket
  constructor(private cs: ChatServiceService, private router:Router) { }

  ngOnInit() {
  }

  chat(){
      this.socket.emit("request message", {
        content: `you have a new chat request`,
        to: this.user.uniqueNum,
        connection:this.user.online,
        from: this.cs.userId
      });

    
      // routerLink="/dashboard/chat"
      //notify the doctor about someone wanting to chat her
      //send an on userCon to a doctor after that redirect to the chat page
      // this.router.navigate(['dashboard/chat'])
      // socket.on("users", (users: any[]) => {
      //   this.userList = users
      // });


  }
// routerLink="/dashboard/chat"
}
