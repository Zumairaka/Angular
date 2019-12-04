import { UserData } from './signup.model';
import { ProductsService } from './../products.service';
import { Router, RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  providers: [ProductsService],
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  userData = new UserData(null,null,null,null,null,null,null,null,null);
  constructor(public router: Router, public serviceObject: ProductsService) { }

  ngOnInit() {
  }

  signUp():void {
    console.log(this.userData);
    this.serviceObject.newUser(this.userData);
    alert('Successful');
  }

  cancel():void {
    this.router.navigate(['']);
  }
}
