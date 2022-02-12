import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { ChatServiceService } from '../../chat-service.service';

@Component({
  selector: 'app-chat-in',
  templateUrl: './chat-in.component.html',
  styleUrls: ['./chat-in.component.scss'],
})
export class ChatInComponent implements OnInit {
  @Input() user:any;
  @Input() chat = []
  inputmsg ={
    content: ''
  }
  currentUser = this.cs.userId
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  

  constructor(private cs:ChatServiceService) { }

  

  ngOnInit() {
    this.cs.socket.on("private message", (data) => {

      try {
        if(data.from === this.user.uniqueNum){
          let day = new Date().toString()
          let obj = {
            content: data.content,
            from : data.from,
            day: day.substring(16, 21)
          }
          this.chat.push(obj)
        }else{
          // alert('you have a new msg')
        }
      } catch (error) {
      }
      
    
       
     });
  }

  sendMessage(){
    let day = new Date().toString()
    
    // alert(this.inputmsg.content)
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

  ngAfterViewChecked(){
    this.scrollToBottom()
  }

  scrollToBottom():void{
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight
    } catch (error) {
    }
  }

}
