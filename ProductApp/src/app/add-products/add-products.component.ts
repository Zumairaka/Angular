import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { IProduct } from '../products/product.model';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent implements OnInit {

  constructor(public serviceObject:ProductsService) { }

  productItem = new IProduct(null,null,null,null,null,null,null,null);

  ngOnInit() {
  }

  AddProduct()
  {
    this.serviceObject.newProduct(this.productItem);
    alert("Success");
  }
}
