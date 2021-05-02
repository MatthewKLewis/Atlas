import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  helpMessage: string = ''

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group(
      {
        username: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
        ]),

      },
    );
  }

  ngOnInit(): void {
  }

  get username() {    return this.loginForm.get('username');  }
  get password() {    return this.loginForm.get('password');  }

  onSubmit() {
    this.userService.logInUser(this.loginForm.value).subscribe((res:any)=>{
      if (res.success) {
        this.userService.storeUserData(res.token, res.user)
        this.router.navigate(['profile'])
      } else {
        this.flashMessage(res.msg)
      }
    })
  }

  flashMessage(text:string) {
    this.helpMessage = text;
    setTimeout(()=>{this.helpMessage = ''}, 1000)
  }

  forgotPassword() {
    this.flashMessage('tough luck')
  }

}
