import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { GeneralService } from '../home/general.service';


@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.page.html',
  styleUrls: ['./profiles.page.scss'],
})
export class ProfilesPage implements OnInit {
  
  errmsg!:string
  allUsers = []
   intitial = []

  

  loading:any
  constructor(private genService: GeneralService, public loadingController: LoadingController) { }

  async ngOnInit() {
 this.loading =  await this.presentLoadingWithOptions()
  await this.loading.present()
  this.allHealthUsers()
  }

  allHealthUsers(){
    this.genService.getAllHealthUsers().pipe(
      map(x => x.users)
    ).subscribe(res => {
      this.allUsers = res
      this.intitial = res
      this.loading.dismiss()
    }, (err) =>{
      this.loading.dismiss()
      this.errmsg = 'hmmm something went wrong we will get back to you'
    })
  }

  async presentLoadingWithOptions() {
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

  fire(position){
    this.allUsers = this.intitial
    let filtered = this.allUsers.filter(x => x.profession?.toLowerCase() === position.toLowerCase())
     filtered.length ? this.allUsers = filtered : this.allUsers = this.intitial

  }

}
