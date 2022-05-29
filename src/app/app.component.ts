import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor( public login:LoginService, private router:Router){}

  logOut(){
    localStorage.removeItem('token');
    this.login.isLoggedIn = false;
    this.router.navigate(['login']);

  }
}
