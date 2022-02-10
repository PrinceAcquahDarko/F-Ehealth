import { Component, OnInit } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { ChatServiceService } from '../chat-service.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  user: any
  chat = []
  allSubs = this.cs.allSubs
  // allSubs$ = this.cs.getAllSubs().pipe(
  //   map(x =>{
  //     let users =  x.users
  //     users.forEach(user => {
  //       if(this.cs.lstorage.status ==='user'){
  //         console.log(this.cs.lstorage.status)
  //         user.online =  this.cs.users.filter(x => x.id === user.toUser.uniqueNum).length ? true : false
  //         user.pic = user.toUser.pic
  //         user.firstname = user.toUser.firstname
  //         user.lastname = user.toUser.lastname
  //         user.uniqueNum = user.toUser.uniqueNum
  //       }else{
  //         console.log(this.cs.lstorage.status)
  //         user.online =  this.cs.users.filter(x => x.id === user.fromUser.uniqueNum).length ? true : false
  //         user.pic = user.fromUser.pic
  //         user.firstname = user.fromUser.firstname
  //         user.lastname = user.fromUser.lastname
  //         user.uniqueNum = user.fromUser.uniqueNum


  //       }
  //     });
  //     return users
  //   }),
  //   tap(x => console.log(x))
  // )
  constructor(private cs:ChatServiceService) { }

  ngOnInit() {
    // this.getAllSubs();
    // this.allSubs.forEach(user => {
    //   if(this.cs.lstorage.status === 'user'){
    //     user.online =  this.cs.users.filter(x => x.id === user.toUser.uniqueNum).length ? true : false
    //   }else{
    //     user.online =  this.cs.users.filter(x => x.id === user.fromUser.uniqueNum).length ? true : false

    //   }

    // })
    if(!this.cs.allSubs.length){
      this.getAllSubs()
    }

  }

  setUser(data){
    this.user = data 
    this.getChats()
  }

  getAllSubs(){
    this.cs.getAllSubs().pipe(
      map(x =>{
        let users =  x.users
        users.forEach(user => {
          user.messages = 0
          if(this.cs.lstorage.status ==='user'){
            console.log(this.cs.lstorage.status)
            user.online =  this.cs.users.filter(x => x.id === user.toUser.uniqueNum).length ? true : false
            user.pic = user.toUser.pic
            user.firstname = user.toUser.firstname
            user.lastname = user.toUser.lastname
            user.uniqueNum = user.toUser.uniqueNum
          }else{
            console.log(this.cs.lstorage.status)
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
    ).subscribe(x => {
      this.cs.allSubs = x
      console.log(this.cs.allSubs, 'from allSubs')
        this.allSubs = this.cs.allSubs
    })
  }

  getChats(){
     this.cs.getChats(this.cs.userId, this.user.uniqueNum).subscribe(
      res => {
        this.chat = res.users
      }
    )
  }

}
