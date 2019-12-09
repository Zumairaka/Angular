import { Router, RouterModule } from '@angular/router';
import { Component, OnInit, Inject } from '@angular/core';
import { LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model:any = {};
  constructor(@Inject(LOCAL_STORAGE) public storage: WebStorageService, public router: Router) { }

  ngOnInit() {
  }

  register():void {
    this.router.navigate(['signUp']);
  }
  login():void {
   if(this.model.uname == 'zumi' && this.model.password == '1234') 
   {
     this.storage.set('uname',this.model.uname);
     this.router.navigate(['products']);
   }
   else
   {
    this.router.navigate(['']);
   }
  }

}
