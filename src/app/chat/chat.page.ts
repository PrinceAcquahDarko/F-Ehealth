import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { ChatServiceService } from '../chat-service.service';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  loading:any
  user: any
  chat = [];
  msgs!:string;
  socket = this.cs.socket
  allSubs = this.cs.allSubs

  userInput!:string
  constructor(private cs:ChatServiceService, private router:Router, public loadingController: LoadingController) { }

  ngOnInit() {
    // this.getAllSubs();
    
    if(!this.cs.allSubs.length){
      // this.router.navigate(['dashboard/profiles'])
      this.getAllSubs()
    }else{
      this.allSubs.forEach(user => {
        if(this.cs.lstorage.status === 'user'){
          user.online =  this.cs.users.filter(x => x.id === user.toUser.uniqueNum).length ? true : false
        }else{
          user.online =  this.cs.users.filter(x => x.id === user.fromUser.uniqueNum).length ? true : false
  
        }
  
      })
    }

 

  }

  fire(event){
     let filtered = this.allSubs.filter(x => x.firstname.toLowerCase().includes(this.userInput.toLowerCase()))
     filtered.length ? this.allSubs = filtered : false

  }

 async  setUser(data){
    this.loading = await this.presentLoading()
    await this.loading.present()
    data.messages = 0
    this.user = data 
    this.getChats()
  }

  getAllSubs(){
    this.cs.getAllSubs().pipe(
      map(x =>{
        let users =  x.users
        users.forEach(user => {
          user.messages = 0
          this.formatUser(user)
        });
        return users
      })
    ).subscribe(x => {
      if(x && x.length){
        this.cs.allSubs = x
          this.allSubs = this.cs.allSubs
      }else{
        this.msgs = 'You have no chats yet'
      }
   
    })
  }

  getChats(){
     this.cs.getChats(this.cs.userId, this.user.uniqueNum).subscribe(
      res => {
        res.users.forEach(user => {
          user.day = user.day.substring(16, 21)
        });
        this.chat = res.users
        this.loading.dismiss()
      },
      err => {
        this.loading.dismiss()
      }
    )
  }

  setUserMob(user){
    // this.router.navigate(['dashboard/interface', {state: user}])
    this.router.navigateByUrl('/dashboard/interface', {state: user})
  }

   async presentLoading() {
    const loading = await this.loadingController.create({
      spinner: 'circles',
      message: 'Loading ...',
      translucent: true,
      cssClass: 'custom-class custom-loading',
      backdropDismiss: true
    });
    // await loading.present();
    return loading

   
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
