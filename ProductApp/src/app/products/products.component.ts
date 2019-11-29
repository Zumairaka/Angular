import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { IProduct } from './product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  providers:[ProductsService],
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products:IProduct[];
  flag:boolean = false;
  value:String = "Show Image";

  constructor( public serviceObject: ProductsService) { }

  ngOnInit():void {
    this.serviceObject.getProductList().subscribe((data)=>{
      this.products = JSON.parse(JSON.stringify(data));
    })

  }
  
  showImage():void{
    if(this.flag == false) //this.flag = !this.flag :- one line is enough
    {
      this.flag = true;
      this.value = "Hide Image";
    }
    else if(this.flag == true)
    {
      this.flag = false;
      this.value = "Show Image";
    }
  }

}
