import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  title = 'MyFirstAngularApp';
  months = ["January","February","March","April","May","June","July","August",
  "September","October","November","December"];
  isavailable = true;
  a = 30;
  b = 20;
  name = 'yourname';
  myClickFunction(val){
  alert("Success");
  console.log(val);
}

}
