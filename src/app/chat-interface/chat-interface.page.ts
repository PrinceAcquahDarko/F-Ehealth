import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ChatServiceService } from '../chat-service.service';

@Component({
  selector: 'app-chat-interface',
  templateUrl: './chat-interface.page.html',
  styleUrls: ['./chat-interface.page.scss'],
})
export class ChatInterfacePage implements OnInit {
  user = this.router.getCurrentNavigation().extras.state
  inputmsg =  {
    content : ''
  }
  chat = []
  currentUser = this.cs.userId
  loading:any
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  constructor(private router:Router, private cs:ChatServiceService, public loadingController: LoadingController) {}

  ngOnInit() {
      console.log(this.user)
      this.getChats()
      this.cs.socket.on("private message", (data) => {
        let day = new Date().toString()

        console.log(data)
        if(data.from === this.user.uniqueNum){
          let obj = {
            content: data.content,
            from : data.from,
            day: day.substring(16, 21)
          }
          this.chat.push(obj)
        }else{
          // alert('you have a new msg')
        }
      
         
       });
     
  }

  sendMessage(){
    let day = new Date().toString()
  //  day = day.toString()
    let obj = {
      content:this.inputmsg.content,
      to: this.user.uniqueNum,
      from: this.currentUser,
      textSort:this.currentUser,
      health: false,
      connection: this.user.online,
      day
    }


    if(this.cs.lstorage.status === 'health'){
      obj.health = true
    }
    this.cs.socket.emit("private message", obj)
    obj.day = obj.day.substring(16, 21)
    this.chat.push(obj)
    this.inputmsg.content = ''
 
  }

  async getChats(){
    this.loading = await this.presentLoading();
    await this.loading.present()
    this.cs.getChats(this.cs.userId, this.user.uniqueNum).subscribe(
     res => {
       this.chat = res.users
      //  console.log(this.chat)
     
      this.chat.forEach(ch => {
        ch.day = ch.day.substring(16, 21)
      })
       this.loading.dismiss()

     },
     err => {
       this.loading.dismiss()
     }
   )
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

  ngAfterViewChecked(){
    this.scrollToBottom()
  }

  scrollToBottom():void{
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight
    } catch (error) {
        console.log(error)
    }
  }

}
