import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IQuote } from '../models/IQuote';
import { DataService } from '../services/data.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort, SortDirection } from '@angular/material/sort';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog-component';
import { CustomerService } from 'src/app/services/customer.service';
import { Subscription } from 'rxjs';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<IQuote>();
  quotes: IQuote[]=[];
  displayedColumns: string[] = [];
  detail:any;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild('secondDialog', { static: true })
  ConfirmDelete!: TemplateRef<any>;
  
  ConfirmDeleteDialog!: MatDialogRef<any, any>;
  desc= 'asc';
  colmnsort ='QuoteID';
  counter = 1;
  pagesSize = 0;
  totalEntries: number = 0;
  fromEntries: number = 0;
  toEntries = 0;
  pageIndex = 0;
  pageSizeOptions: number[] = [5, 10, 15, 25];
  pageIndexArray: number[] = [];
  activePage = 1;
  item:any;
  pageItemsArray:number[]=[];
  quote:IQuote = {QuoteID:0,  QuoteType:'',  Contact:'', DueDate:'', TaskType:'', Task:''};
 

  constructor(private route: Router, private dataservice: DataService, public dialog: MatDialog,private customersevice:CustomerService) {


  }
  getAllInfor()
  {
    debugger;
    this.dataservice.getData().subscribe({next:(data)=>{
      this.quotes=data;
      console.log(this.quotes);
      localStorage.setItem('quotes', JSON.stringify(this.quotes));
     
    }})
    this.dataSource.data = this.quotes;
    this.displayedColumns = Object.keys(this.dataSource.data[0]);
    this.displayedColumns.push('Actions');
    this.paginator.pageIndex = 0;
    this.paginator.pageSize = this.pageSizeOptions[0];
    this.paginator.length = this.dataSource.data.length;
  
    this.congfigPaginator();
    this.calculateRangeLabel() ;
    this.dataservice.datachanged.subscribe(x=>{
      debugger
      let desc = this.desc;
      let colmnsort = this.colmnsort 
      this.quotes = x;
      this.dataSource.data = this.quotes;
    this.displayedColumns = Object.keys(this.dataSource.data[0]);
    this.displayedColumns.push('Actions');
  
    this.congfigPaginator();
    this.calculateRangeLabel() ;
    this.sortData(desc, colmnsort);
    })

  }
    
  

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent,{data:{}});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngAfterViewInit() {
   // this.congfigPaginator();
   }

  ngOnInit(): void {
    this.getAllInfor(); 
    
  }

   

  previousitem() {
    this.paginator.previousPage();
    this.congfigPaginator();
    this.calculateRangeLabel();
    this.activePage = this.paginator.pageIndex +1; 
  
  }

  nextitem() {
    this.paginator.nextPage();
    this.congfigPaginator();
    this.calculateRangeLabel();
    
    this.activePage = this.paginator.pageIndex +1;
  
  }

  congfigPaginator() {
    this.pageIndexArray =[];
     for(let i=1; i<=this.paginator.getNumberOfPages();i++){
       if((this.paginator.pageIndex+1) < this.paginator.length){
         this.pageIndexArray.push(i)
       }
     }

  this.buildPage(this.paginator.pageIndex);
    this.dataSource.paginator = this.paginator;
  }

  
  selectPage(psg: number) {
    
    this.paginator.pageIndex = (psg - 1);
   this.congfigPaginator();
   this.calculateRangeLabel();
  
   this.activePage = this.paginator.pageIndex +1;
  }

 

addTask(){
  

  const dialogRef = this.dialog.open(DialogComponent,{data:null});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
}

updateTask(task: any){
  let  quote:IQuote = {QuoteID:0,  QuoteType:'', Contact:'', DueDate:'', Task:'', TaskType:''};
 quote.QuoteID = task['QuoteID'];
 quote.Task = task['Task'];
 quote.TaskType = task['TaskType'];
 quote.Contact = task['Contact'];
 quote.QuoteType = task['QuoteType'];
 quote.DueDate = task['DueDate'];
 
  const dialogRef = this.dialog.open(DialogComponent,{data:quote});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
}

details(task:any){
    this.route.navigate(['quote-details'],{queryParams:{id:task['QuoteID']}});
}
deleteTask(task:any){
  this.dataservice.deteleByID(task['QuoteID']).subscribe({next:(data)=>{
    alert("delete successfully")

  }})
  this.dataservice.deleteItem(task['QuoteID']);

}
onDismissDelete(){
 this.ConfirmDeleteDialog.close(false);
}
onConfirmDelete(){
  this.ConfirmDeleteDialog.close(true);
}


setPageSizeOptions(event: Event) {
  this.paginator.pageSize= +( event.target as HTMLInputElement).value;
 // this.activePage = 1;
  this.paginator.pageIndex = 0;
  this.congfigPaginator();
  this.calculateRangeLabel();  
 
}


calculateRangeLabel(){
  let pageIndex = this.paginator.pageIndex;
  let pageSize = this.paginator.pageSize;
  let length = this.paginator.length;
  this.item ="Showing "+ this.paginator._intl.getRangeLabel(pageIndex,pageSize,length).replace(String.fromCharCode(8211), 'to');

 
}


buildPage(currPage:number) {
  this.pageItemsArray = [];
  let arry:number[] =[];
  if(this.paginator.getNumberOfPages()>=7){
    const trimStart = currPage;
    const trimEnd = trimStart + 7;
    
    const maxlength = this.pageIndexArray.length-1;

    if(trimStart >= this.pageIndexArray[this.pageIndexArray.length-6]){
      arry= this.pageIndexArray.slice( this.pageIndexArray[this.pageIndexArray.length-6], this.pageIndexArray.length);
    } else{
      if (trimEnd > (maxlength) ) {
        arry = this.pageIndexArray.slice(maxlength-7, this.pageIndexArray[maxlength]);
      } else{
        arry= this.pageIndexArray.slice(trimStart, trimEnd);
      }
    }
   
   
  } else{
    arry = this.pageIndexArray;
  }
 
 this.pageItemsArray = arry;
 console.log(this.pageItemsArray)
}


OrderBy(x: any){
  this.colmnsort =x.value;
this.sortData(this.desc, this.colmnsort);
}
checkboxChange(event:any){
  debugger;
 if(event.checked){
   this.desc ='desc';
 } else{
   this.desc = 'asc';
 }

 this.sortData(this.desc, this.colmnsort);

}

compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

sortData(_direction:string, _active: string) {
  let SortDirection:SortDirection= "";
  if(_direction=='asc'){
    SortDirection = 'asc';
  } else{
    SortDirection = 'desc'
  }

  let sort:Sort ={direction:SortDirection, active:_active}
  const data = this.dataSource.data.slice();
  if (!sort.active || sort.direction === '') {
    this.dataSource.data = data;
    return;
  }
 
  this.dataSource.data = data.sort((a, b) => {
    const x = _active;
    const isAsc = sort.direction === 'asc';
    debugger
    switch (sort.active) {
      case 'QuoteID':
        return this.compare(a['QuoteID'], b['QuoteID'], isAsc);
      case 'QuoteType':
        return this.compare(a['QuoteType'], b['QuoteType'], isAsc);
      case 'Description':
        return this.compare(a['DTaskType'], b['TaskType'], isAsc);
      case 'Sales':
        return this.compare(a[' Contact'], b[' Contact'], isAsc);
      case 'DueDate':
        return this.compare(a['DueDate'], b['DueDate'], isAsc);
      case _active:
        return this.compare(a['Task'], b['Task'], isAsc);
         
      default:
        return 0;
    }
 
});

}


applyFilter(event: Event) {
  debugger;
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
  this.congfigPaginator();
  this.calculateRangeLabel();  
 
}
}


