import { Component,OnInit} from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customer:any;
  constructor(private customersevice:CustomerService) { }

  ngOnInit():void {
  }
  registerUser()
  {
    this.customersevice.register().subscribe({next:(data)=>{
      alert("Registration successful !");

    },error:(err)=>{console.log(err)}})
  }
  login()
  {
    this.customersevice.login().subscribe({next:(data)=>{
      debugger;
      localStorage.setItem('token',data['access_token']);
      alert("Login successful !");

    },error:(err)=>{console.log(err)}})

  }
 
  getAllInfor()
  {
     debugger;
    this.customersevice.getData().subscribe({next:(data)=>{
      this.customer=data;
    },error:(err)=>{console.log(err)}})
  }
 
}
