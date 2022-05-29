import { Component, Inject, OnInit } from "@angular/core";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import { MAT_DIALOG_DATA , MatDialog} from "@angular/material/dialog";
import { IQuote } from "../models/IQuote";
import * as _moment from 'moment';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { DataService } from "../services/data.service";
const moment = _moment;



@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.css'],
    
  })
export class DialogComponent implements OnInit{
  val:string='';
  quote:IQuote = {QuoteID:0,  QuoteType:'', TaskType:'', DueDate:'', Task:'', Contact:''};
  date = moment();
  title="Add New Quote";
  dialog_form:any;

  get QuoteID() { return this.dialog_form.get('QuoteID'); }
  get Contact () { return this.dialog_form.get('Contact'); }

  get QuoteType() { return this.dialog_form.get('QuoteType'); }
  get DueDate() { return this.dialog_form.get('DueDate'); }
  get Task() { return this.dialog_form.get('Task'); }
  get TaskType() { return this.dialog_form.get('TaskType'); }
   
  hours = 12;
  minutes = 0;

  
  constructor(@Inject(MAT_DIALOG_DATA) public data: IQuote, private dataservice:DataService) {
  
  }

  changeQuoteType(e:any) {
    this.dialog_form.get('QuoteType').setValue(e.target.value, {
       onlySelf: true
    })
  }

  ngOnInit(): void {
      this.dialog_form = new FormGroup({
        'QuoteID': new FormControl( 0, [Validators.required]),
        'TaskType': new FormControl('', [Validators.required]),
        'QuoteType': new FormControl( '', [Validators.required]),
        'DueDate': new FormControl(new Date(), [Validators.required]),
        'Contact': new FormControl('' , [Validators.required]),
        'Task': new FormControl('', [Validators.required]),
        
         
      });

      if(this.data){
        debugger;
         this.QuoteID.value = this.data.QuoteID; 
         this.QuoteType.value = this.data.QuoteType;
         this.Contact.value = this.data.Contact;
         this.TaskType.value = this.data.TaskType;
         this.Task.value= this.data.Task;
         this.DueDate.value = new Date( this.data.DueDate);
         this.title = "Update Quote"
      } else{
        this.title = "Add New Quote";
      }
   
  }
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    debugger;
    this.date = moment(event.value);
     this.quote.DueDate = this.date.month().toString()+'/' + this.date.day().toString()+'/' + this.date.year().toString();
  }


  SubmitForm(){
    debugger
    this.quote.TaskType = this.TaskType.value;
    this.quote.Task = this.Task.value;
    this.quote.Contact = this.Contact.value;
    this.quote.QuoteType = this.QuoteType.value;
    this.quote.QuoteID = this.QuoteID.value;
    this.quote.DueDate =  moment( this.DueDate.value).format('MM/DD/YYYY').toString();   

    
    if(this.title == 'Update Quote'){

      this.dataservice.updateData(this.quote.QuoteID, this.quote).subscribe({next:(data)=>{
      
        alert("Update Quote successfully")
      }});
     }
     else{
      this.dataservice.AddData(this.quote).subscribe({next:(data)=>{
      
        alert("Add Quote successfully")
      }})
     }

    

}
}