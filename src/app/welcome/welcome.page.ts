import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GeneralService } from '../home/general.service';


function passwordMatcher(c: AbstractControl): { [key:string]: boolean } | null {

  const passwordControl = c.get('password');
  const confirmPassword = c.get('confirmPassword');

  if (passwordControl?.pristine || confirmPassword?.pristine){
    return null;
  }
  if (passwordControl?.value === confirmPassword?.value){
    return null
  }
  return {'match': true}
}

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  errormsg!:string
  show = false
  registerForm: FormGroup = this.fb.group({

    firstname: ['', [Validators.required]],
    lastname: ['', [Validators.required]],

    email: ['', [Validators.required, Validators.email]],

    passwordGroup: this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],

      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    }, {validators: passwordMatcher}),

  })

  constructor(private fb: FormBuilder, private genService: GeneralService, private router:Router) { }

  ngOnInit() {
  }

  registerUser(): void{
    this.show = true
    if(this.registerForm?.valid){
      let data = this.formatValue()
      this.genService.registerUser(data).subscribe(
        res => {
          localStorage.setItem('Info', JSON.stringify(res.user));
       
          this.router.navigate(['dashboard'])
        },
        err => {
          this.show = false
          this.errormsg = err;

        },
      )
    }
  }

  formatValue(){
    return {
      firstname : this.registerForm.value.firstname,
      lastname : this.registerForm.value.lastname,
      email : this.registerForm.value.email,
      password : this.registerForm.value.passwordGroup.password
    }

  }

}
