import { ProductsService } from './../products.service';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Router, RouterModule } from '@angular/router';
import { Component, OnInit, Inject } from '@angular/core';
import { IProduct } from '../products/product.model';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  providers:[ProductsService],
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent implements OnInit {
  sessionVal;
  name;
  constructor(@Inject(LOCAL_STORAGE) public storage: WebStorageService, public serviceObject: ProductsService, public router: Router) { }

  productItem = new IProduct(null,null,null,null,null,null,null,null);

  ngOnInit() {
    this.sessionVal = this.storage.get('uname');
    if(this.sessionVal == '')
    {
      this.router.navigate(['']);
    }
    else
    {
      if(this.sessionVal == 'zumi')
      {
        this.name = 'zumi';
        this.router.navigate(['addProducts']);
      }
      else
      {
        this.router.navigate(['']);
      }
    }
  }

  AddProduct() {
    this.serviceObject.newProduct(this.productItem);
    alert('Added Successfully');
  }

  link(no):void {
    if(no == 1)
      this.router.navigate(['products']);
    else if(no == 2)
      this.router.navigate(['addProducts']);
  }

  logout():void {
    this.storage.remove('uname');
    this.router.navigate(['']);
  }
}


