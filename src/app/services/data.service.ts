import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IQuote } from '../models/IQuote';

@Injectable({
  providedIn: 'root'
})


export class DataService {
quotes:IQuote[] = [];
datachanged:Subject<IQuote[]> = new Subject<IQuote[]>();
 
constructor( private http:HttpClient) {
  this.LoadQuotes();
   }

getData():Observable<IQuote[]>
{
  debugger;
  let token=localStorage.getItem('token');
  let _headers=new HttpHeaders({
    'Authorization':`Bearer ${token}`,
    'Content-Type':'application/json'
  });
  

  return this.http.get<IQuote[]>('https://localhost:44302/api/Task',{headers:_headers});
  
}

getDataByID(id:number):Observable<IQuote[]>
{
  debugger;
  let token=localStorage.getItem('token');
  let _headers=new HttpHeaders({
    'Authorization':`Bearer ${token}`,
    'Content-Type':'application/json'
  });
   
 let result;

   result=this.http.get<IQuote[]>('https://localhost:44302/api/Task/'+id,{headers:_headers})
   return result;
 
}


updateData(id:number, quote:IQuote){
  debugger;
  let x =  this.quotes.findIndex(q=>q.QuoteID == id);
 this.quotes[x] = quote;
 localStorage.setItem('quotes', JSON.stringify(this.quotes));
 this.datachanged.next(this.quotes);
 let options=
{
 
  headers:new HttpHeaders().set('content-type','application/x-www-form-urlencoded')

};
let body=new URLSearchParams();
  body.set('Contact',quote.Contact);
  body.set('QuoteType',quote.QuoteType);
  body.set('DueDate',quote.DueDate);
  body.set('Task',quote.Task);
  body.set('TaskType',quote.TaskType);


return this.http.put<IQuote[]>('https://localhost:44302/api/Task/'+id,body,options,)
}
AddData(quote:IQuote){
  debugger;
  let id  = (this.quotes.sort( (a,b)=> a.QuoteID-b.QuoteID)).length + 1;
this.quotes.push(quote);
localStorage.setItem('quotes', JSON.stringify(this.quotes));
this.datachanged.next(this.quotes);

let options=
{
 
  headers:new HttpHeaders().set('content-type','application/x-www-form-urlencoded')

};
let body=new URLSearchParams();
  body.set('Contact',quote.Contact);
  body.set('QuoteType',quote.QuoteType);
  body.set('DueDate',quote.DueDate);
  body.set('Task',quote.Task);
  body.set('TaskType',quote.TaskType);


return this.http.post<IQuote[]>('https://localhost:44302/api/Task/',body,options)

}
deteleByID(id:number)
{
  debugger;
  let _headers=new HttpHeaders({
   
    'Content-Type':'application/json'
  });
  return this.http.delete<IQuote[]>('https://localhost:44302/api/Task/'+id,{headers:_headers});
 
}
deleteItem(id:number){
  debugger;
  let x =  this.quotes.findIndex(q=>q.QuoteID == id);
  this.quotes.splice(x, 1);
  localStorage.setItem('quotes', JSON.stringify(this.quotes));
this.datachanged.next(this.quotes);

}

LoadQuotes() {
  debugger;
  this.quotes = [];
  let qoutes = JSON.stringify(localStorage.getItem('quotes'));
  this.quotes = JSON.parse(JSON.parse(qoutes));
  console.log(this.quotes);


}


}


