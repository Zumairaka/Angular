import { Component, OnInit, Inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(@Inject(LOCAL_STORAGE) private storage:WebStorageService,
              private router:Router) { }
  sessionVal;
  address;

  ngOnInit() {
    
    this.sessionVal = this.storage.get("uname");
    if(this.sessionVal == '')
    {
      this.router.navigate(['']);
    }
    else
    {
      if(this.sessionVal == 'zumaira')
      {
        this.address = "Zayira Mahal, Kasargod";
      }
      else if(this.sessionVal == 'nikhila')
      {
        this.address = "Valiyaparambil, Kannur";
      }
      else
      {
        this.router.navigate(['']);
      }
    }
  }

  logout() {
    this.storage.remove("uname");
    this.router.navigate(['']);
  }

}
