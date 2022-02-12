import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ChatServiceService } from '../chat-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userList  = []
  status = this.cs.lstorage.status
  user = this.router.getCurrentNavigation().extras.state
  socket = this.cs.socket
 online =  this.cs.users.filter(x => x.id === this.user.uniqueNum).length ? true : false
  
  constructor(private cs: ChatServiceService, private router:Router, public alertController: AlertController) { }

  ngOnInit() {
  }

  async chat(){
    let sub = this.cs.allSubs.filter(x => x.uniqueNum === this.user.uniqueNum).length ? true : false
    if(sub){
      this.router.navigate(['dashboard/chat'])
      return
    }
    const alert = await this.alertController.create({
      cssClass: 'my-alert-class',
      header: 'Confirm',
      message: ` <small>You are about to send a request to ${this.user.firstname}. If he's online (he's ${this.online ? 'online' : 'offline'}) you should be redirected in no time
      else he's going to accept it when he's online. You can also log in as ${this.user.firstname} by following this 
      <a href="https://github.com/PrinceAcquahDarko/E-health#readme" target="_blank">guide</a>  </small>
      `,
      buttons:[
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass:'secondary'
        },
        {
          text: 'Confirm',
          handler: () => {
              this.requestChat()
          }
        },
      ]
    })

    await alert.present()


  }

requestChat(){
  this.socket.emit("request message", {
    content: `you have a new chat request`,
    to: this.user.uniqueNum,
    connection:this.online,
    from: this.cs.userId,
    day: new Date().toString()

  });
}
}


