import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../home/general.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  label = 'Upload an img'
  show = false;
  credentials = {
    firstname: '',
    lastname: '',
    email: '',
    pic: '',
    password: ''


  }

  selectImage(event: any){
    if(event.target.files.length > 0){
      const file = event.target.files[0];
      this.label = file.name
      this.credentials.pic = file
    }
  }
  constructor(private genservice: GeneralService) { }

  ngOnInit() {
    this.genservice.getSingleUser().subscribe(
      res => {
       let x = res.user
        this.format(x)
      }
    )
  }

  format(data){
    this.credentials.firstname = data.firstname
    this.credentials.lastname = data.lastname
    this.credentials.email = data.email

  }

  submit(){
    this.show = true;

    const formdata = new FormData()
    formdata.append('pic', this.credentials.pic)
    formdata.append('name', this.credentials.firstname)
    formdata.append('description', this.credentials.lastname)
    formdata.append('startdate', this.credentials.email)
    if(this.credentials.password){
    formdata.append('password', this.credentials.password)

    }


    this.genservice.updateUser(formdata).subscribe(
      res =>alert('updated successfully'),
    )
  }

}
