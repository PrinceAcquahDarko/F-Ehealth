import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
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

  constructor(private menu: MenuController, private cs: ChatServiceService, private router: Router) { }

   ngOnInit() {
     this.getAllSubs().subscribe(x => {
       this.cs.allSubs = x
       console.log(x, 'from xxxeefd')
       this.allSockets()
      })
      
      this.menu.enable(true, 'custom');
      this.menu.open('custom');
  
  }

  
  openFirst() {
    console.log('yest')
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
          if(this.cs.lstorage.status ==='user'){
            console.log(this.cs.users.filter(x => x.id === user.toUser.uniqueNum).length, 'from ops')
            user.online =  this.cs.users.filter(x => x.id === user.toUser.uniqueNum).length ? true : false
            user.pic = user.toUser.pic
            user.firstname = user.toUser.firstname
            user.lastname = user.toUser.lastname
            user.uniqueNum = user.toUser.uniqueNum
          }else{
            console.log(this.cs.users.filter(x => x.id === user.fromUser.uniqueNum).length, 'from ops')
            user.online =  this.cs.users.filter(x => x.id === user.fromUser.uniqueNum).length ? true : false
            user.pic = user.fromUser.pic
            user.firstname = user.fromUser.firstname
            user.lastname = user.fromUser.lastname
            user.uniqueNum = user.fromUser.uniqueNum
  
  
          }
        });
        return users
      }),
      tap(x => console.log(x))
    )
  }

  allSockets(){
    this.socket =  this.cs.initiliazeSocket()
    this.socket.on("request message", (data) => {
      alert(data.content)
    

      if(this.cs.lstorage.status === 'health'){
        this.notifications += 1
      }
        
     
      this.socket.emit("confirm message", {
        content: `okay`,
        from: this.cs.userId,
        to: data.from,
        connection: this.cs.users.filter(x => x.id === data.from).length ? true : false
      });
    });

    this.socket.on("confirm message", (data) => {
      console.log(data.content)
      console.log(data.from)
 
    if(this.cs.lstorage.status === 'user'){
      this.notifications += 1
    }
     let msg = `Doc ${data.from} has accepted your chat request`
     alert(msg)
     this.router.navigate(['dashboard/chat'])
      
       
     });

     this.socket.on("private message", (data) => {
      // if(data.from === this.user.user.uniqueNum){
      let user =  this.cs.allSubs.find(x => x.uniqueNum === data.from)
      user.messages += 1
      this.getAllMsgsLength()
        alert(user)
        // this.chat.push(obj)
      // }else{
        // alert('you have a new msg')
      })
    
      this.socket.on("savedChats", (data) => {
        // alert(data.content)
        this.msgs += 1
        let user =  this.cs.allSubs.find(x => x.uniqueNum === data.from)
        user.messages += 1
      })

      this.socket.on("savedNoti", (data)=>{
        alert('you have new notifications');
        console.log(this.cs.users.filter(x => x.id === data.from).length ? true : false, 'from online')
        this.notifications += 1
        if(this.cs.lstorage.status === 'health'){
          this.socket.emit("confirm message", {
            content: `okay`,
            from: this.cs.userId,
            to: data.from,
            connection: this.cs.users.filter(x => x.id === data.from).length ? true : false
          });
        }
      
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

}
