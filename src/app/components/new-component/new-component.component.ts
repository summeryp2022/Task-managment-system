import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-component',
  templateUrl: './new-component.component.html',
  styleUrls: ['./new-component.component.css']
})
export class NewComponentComponent implements OnInit {
   itle = "Directive Demo";
  styleObj = { 'border': '2px solid green' };
  flag = true;
  radiusvalue = '.30em';

  employees = [
    {
      "userId": 1,
      "firstName": "Krish",
      "lastName": "Lee",
      "phoneNumber": "123456",
      "emailAddress": "krish.lee@learningcontainer.com"
    },
    {
      "userId": 2,
      "firstName": "racks",
      "lastName": "jacson",
      "phoneNumber": "123456",
      "emailAddress": "racks.jacson@learningcontainer.com"
    },
    {
      "userId": 3,
      "firstName": "denial",
      "lastName": "roast",
      "phoneNumber": "33333333",
      "emailAddress": "denial.roast@learningcontainer.com"
    },
    {
      "userId": 4,
      "firstName": "devid",
      "lastName": "neo",
      "phoneNumber": "222222222",
      "emailAddress": "devid.neo@learningcontainer.com"
    },
    {
      "userId": 5,
      "firstName": "jone",
      "lastName": "mac",
      "phoneNumber": "111111111",
      "emailAddress": "jone.mac@learningcontainer.com"
    }
  ];

  ngOnInit(): void {
  }
  ToggleBorder() {

    if (this.styleObj['border'] == '1px solid red') {
      this.styleObj['border'] = '2px solid green';
    } else {
      this.styleObj['border'] = '1px solid red';
    }
  }

  ToggleTable() {
    this.flag = !this.flag;
  }
}
