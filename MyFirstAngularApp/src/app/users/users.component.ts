import { Component, OnInit } from '@angular/core';
//import { HttpClient } from '@angular/common/http';
import { GetusersService } from '../getusers.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(public serviceObject:GetusersService) { }

  ngOnInit() {
  }
  userData;
  getUsers(){
    this.serviceObject.getUserService()
    .subscribe((users)=>{
      this.userData = users;
    })
  }

}
