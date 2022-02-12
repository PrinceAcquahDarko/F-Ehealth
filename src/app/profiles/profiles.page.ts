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
      this.loading.dismiss()
    }, (err) =>{
      this.loading.dismiss()
      // alert('hmm something went wrong')
      console.log(err)
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
    // this.searchedptn.next(position)
    this.allUsers.filter((i: { position: string; }) => position ?  i.position === position.trim() : true)

  }

}
