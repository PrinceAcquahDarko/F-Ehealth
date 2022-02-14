import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(public alertController: AlertController) {}

   async ngOnInit() {
   await this.present()
  }

}

async present(){
		const alert = await this.alertController.create({
      cssClass: 'my-alert-class',
      header: 'Confirm',
      message: ` You can log in with info@gmail.com as email and 123456 as password or visit <a href="https://github.com/PrinceAcquahDarko/E-health#readme" target="_blank">link</a> for more options
      `,
       buttons:[
       
        {
          text: 'Ok',
          handler: () => {
              
          }
        },
      ]
     
    })

    await alert.present()
}


