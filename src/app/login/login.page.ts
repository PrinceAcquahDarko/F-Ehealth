import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from '../home/general.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  errormsg= 'Please sign in below with the credentials used in signing up'
  userCredentials= {
    email: '',
    password: ''
  }
  constructor(private genService: GeneralService, private router: Router) { }

  ngOnInit() {
  }

  loginUser(): void{
      this.genService.loginUser(this.userCredentials).subscribe(
        res => {
          localStorage.setItem('token', JSON.stringify(res.token));
          localStorage.setItem('firstname', JSON.stringify(res.firstname));
          this.router.navigate(['dashboard'])

        },
        err => {
          this.errormsg = err;
          // this.show = false;
        },
        () => {
          // this.show = false;
        }
      )
    }

}
