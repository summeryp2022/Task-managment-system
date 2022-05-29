import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmedPasswordValidator } from '../confirm-password-validator';
import { LoginService } from '../services/login.service';
import { NotificationService } from '../services/notification.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  
})
export class LoginComponent  {

 // username = 'input'
 // password = 'input'
  isLoggedIn: boolean = false;

  loginbox= true;
  registerbox= false;
  loginForm:any;
  registerForm:any;
  
  get login_name() { return this.loginForm.get('userName'); }
  get login_password() { return this.loginForm.get('password'); }
  get register_name() { return this.registerForm.get('username'); }
  get register_password() { return this.registerForm.get('password'); }
  get f(){
    return this.registerForm.controls;
  }

  constructor(private loginservice: LoginService, private router: Router,
     private notificationservice:NotificationService, private fb:FormBuilder) {}

  ngOnInit(): void {
    this.loginForm  = this.fb.group({
              userName: new FormControl('', [Validators.required]),
              password: new FormControl('', [Validators.required])
            })

    this.registerForm = this.fb.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirmpassword: new FormControl('', [Validators.required])},  
      { validator: ConfirmedPasswordValidator('password', 'confirmpassword')
    });

  
  }


  loginSubmit() {
    var userInfo = this.loginForm.value;
    this.loginservice.login(userInfo.userName, userInfo.password).subscribe({next:(data)=>{
        debugger;
        localStorage.setItem('token',data['access_token']);
        this.isLoggedIn= true;
        alert("Login successful !");
        this.router.navigate(['/home'])
      },error:(err)=>{console.log(err)}})
  }

  registerSubmit(){
    let users= this.registerForm.value;
    let result=this.loginservice.register(users.username, users.password,users.confirmpassword).subscribe({next:(data)=>{
      debugger;
      alert("Registration Successful!");
    },error:(err)=>{console.log(err)}})
  }

switchtabs(){
  this.loginForm.reset();
  this.registerForm.reset();
  this.loginbox = !this.loginbox;
  this.registerbox = !this.registerbox;
}
  }




