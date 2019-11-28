import { Component, OnInit, Inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import  { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(@Inject(LOCAL_STORAGE) private storage:WebStorageService,
              private router:Router) { }

  ngOnInit() {
             }
  model:any = { }

  login(){
        if((this.model.uname == 'zumaira' && this.model.password) == '1234' || (this.model.uname == 'nikhila' && this.model.password == 'abcd'))
        {
          this.storage.set("uname",this.model.uname);
          this.router.navigate(['home']);
        }
        else
        {
          this.router.navigate(['']);
        }
  }

}

