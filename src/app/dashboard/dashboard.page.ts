import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController,ToastController } from '@ionic/angular';
import { map, tap } from 'rxjs/operators';
import { ChatServiceService } from '../chat-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  socket:any
  msgs = 0
  notifications = 0
  loggedInUser = this.cs.lstorage

  constructor(private menu: MenuController, private cs: ChatServiceService, 
  private router: Router, public toastController: ToastController) { }

   ngOnInit() {
    this.socket =  this.cs.initiliazeSocket()

     this.getAllSubs().subscribe(x => {
       this.cs.allSubs = x
       this.allSockets()
      })
      
      // this.menu.enable(true, 'custom');
      // this.menu.open('custom');
  
  }

  
  openMenu() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

  getAllSubs(){
    return this.cs.getAllSubs().pipe(
      map(x =>{
        let users =  x.users
        users.forEach(user => {
          if(user.messages){
            user.messages = user.messages
          }else{
            user.messages = 0
          }
          this.formatUser(user)
        });
        return users
      })
    )
  }

  allSockets(){
    this.socket.on("request message", (data) => {
        this.presentToastWithOptions('Notifications', data.content)
      if(this.cs.lstorage.status === 'health'){
        this.notifications += 1
      }
        
     
      this.socket.emit("confirm message", {
        content: `okay`,
        from: this.cs.userId,
        to: data.from,
        connection: this.cs.users.filter(x => x.id === data.from).length ? true : false,
        day: new Date().toString()

      });
    });

    this.socket.on("confirm message", (data) => {
      let user = data.sub
      user.messages = 0;
       this.formatUser(user)
      this.cs.allSubs.push(user)


 
    if(this.cs.lstorage.status === 'user'){
      this.notifications += 1
    }
     this.presentToastWithOptions('ChatRequest', 'your Chat request has been accepted')

     this.router.navigate(['dashboard/chat'])
      
       
     });

     this.socket.on("private message", (data) => {
      // if(data.from === this.user.user.uniqueNum){
      let user =  this.cs.allSubs.find(x => x.uniqueNum === data.from)
      user.messages += 1
      this.cs.allSubs.sort((x,y) => x == user ? -1 : y == user ? 1: 0)
      this.getAllMsgsLength()
      this.presentToastWithOptions('Message', 'you have a new message')
      })
    
      this.socket.on("savedChats", (data) => {
        this.msgs += 1
        let user =  this.cs.allSubs.find(x => x.uniqueNum === data.from)
        user.messages += 1
      })

      this.socket.on("savedNoti",async (data)=>{
        this.presentToastWithOptions('Notifications', 'you have new notifications')
        this.notifications += 1
        if(this.cs.lstorage.status === 'health'){
          let day = new Date().toString()

          this.socket.emit("confirm message", {
            content: `okay`,
            from: this.cs.userId,
            to: data.from,
            connection: this.cs.users.filter(x => x.id === data.from).length ? true : false,
           day

          });
        }
      
      })

      this.socket.on("user disconnected", (data) => {
        let user =  this.cs.allSubs.find(x => x.uniqueNum === data)
        user.online = false
      })
  }

  getAllMsgsLength(){
    this.cs.allSubs.forEach(sub => {
      this.msgs += sub.messages
    })
  }

  chatRoute(){
    this.msgs = 0
    this.router.navigate(['dashboard/chat'])

  }

  notificationRoute(){
    this.notifications = 0
    this.router.navigate(['dashboard/notification'])

  }

   async presentToastWithOptions(header, msg) {
    const toast = await this.toastController.create({
      header,
      message:msg,
      icon: 'information-circle',
      position: 'top',
      duration: 4000
 
    });
    await toast.present();
  }


  logout(){
    this.router.navigate(['home'])
    localStorage.clear()
  }

  formatUser(user){
    if(this.cs.lstorage.status ==='user'){
      user.online =  this.cs.users.filter(x => x.id === user.toUser.uniqueNum).length ? true : false
      user.pic = user.toUser.pic
      user.firstname = user.toUser.firstname
      user.lastname = user.toUser.lastname
      user.uniqueNum = user.toUser.uniqueNum
    }else{
      user.online =  this.cs.users.filter(x => x.id === user.fromUser.uniqueNum).length ? true : false
      user.pic = user.fromUser.pic
      user.firstname = user.fromUser.firstname
      user.lastname = user.fromUser.lastname
      user.uniqueNum = user.fromUser.uniqueNum
    }

  }

}
