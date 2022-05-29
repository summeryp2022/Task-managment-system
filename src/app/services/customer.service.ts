import { HttpClient, HttpHandler, HttpHeaders,HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(public http:HttpClient) { }
  getData()
  {
    debugger;
    let token=localStorage.getItem('token');
    let _headers=new HttpHeaders({
      'Authorization':`Bearer ${token}`,
      'Content-Type':'application/json'
    });
    
    return this.http.get('https://localhost:44302/api/Task',{headers:_headers})

  }
  register(){
    let options=
    {
      headers:new HttpHeaders().set('content-type','application/json')

    };
   let body={
    
      "Name":"",
      "Password": ""
  }
  return this.http.post('https://localhost:44302/api/Account',body,options)
   }

   login(){
    debugger;
    let options=
    {
     
      headers:new HttpHeaders().set('content-type','application/x-www-form-urlencoded')

    };
   let body=new URLSearchParams();
      body.set('username','Lily1');
      body.set('password','1234567');
      body.set('grant_type','password');
  
  return this.http.post('https://localhost:44302/token',body,options)
   }
   getUserByName(name:string)
 {
   return this.http.get('https://localhost:44302/api/Account/'+name);

}
  

   
 }

