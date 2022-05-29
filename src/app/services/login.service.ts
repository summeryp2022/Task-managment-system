import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  user:any;
  authToken:string;
  isLoggedIn = false;

  constructor(private http: HttpClient, private customersevice:CustomerService) {
    
  }



  register(_username: string, _password: string, _confirmpassword: string){
    
      let options=
      {
        headers:new HttpHeaders().set('content-type','application/json')
  
      };
          
          let body={
      
            "Name":_username,
            "Password": _password
        }
        return this.http.post('https://localhost:44302/api/Account',body,options);
    } 
 
  

  login(_username: string, _password: string)  {
   
    
    let options=
    {
     
      headers:new HttpHeaders().set('content-type','application/x-www-form-urlencoded')

    };
   let body=new URLSearchParams();
      body.set('username',_username);
      body.set('password',_password);
      body.set('grant_type','password');
  
  return this.http.post('https://localhost:44302/token',body,options)
  }
   
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

  
}



