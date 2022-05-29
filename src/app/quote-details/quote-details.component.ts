
import { Component, OnInit } from '@angular/core';
import { IQuote } from '../models/IQuote';
import { DataService } from '../services/data.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-quote-details',
  templateUrl: './quote-details.component.html',
  styleUrls: ['./quote-details.component.css']
})
export class QuoteDetailsComponent implements OnInit {
  quote: IQuote = { QuoteID: 0, QuoteType:'', Task: '', DueDate: '', TaskType:'', Contact: '' };
  quotes:IQuote[]= [];
  constructor(private dataservice: DataService,private activatedroute: ActivatedRoute) { 
   
    this.quotes = this.dataservice.quotes;
   
   }


  ngOnInit(): void {
   debugger;
   this.activatedroute.queryParams.subscribe((params) => {
    let id = +params['id'];
   
      let x = this.quotes.findIndex(x => x.QuoteID == +params['id'])
      this.quote = this.quotes[x];
    
  })
}
  
  }