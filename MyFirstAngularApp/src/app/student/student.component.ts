import { Component, OnInit } from '@angular/core';
import { GetusersService } from '../getusers.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  constructor(public serviceObject:GetusersService) { }

  userData;
  ngOnInit() {
    this.serviceObject.getUserService()
    .subscribe((users)=>{
      this.userData = users;
    })
  }

}
