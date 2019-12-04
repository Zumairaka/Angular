import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Router, RouterModule } from '@angular/router';
import { Component, OnInit, Inject } from '@angular/core';
import { ProductsService } from '../products.service';
import { IProduct } from '../products/product.model';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  providers: [ ProductsService ],
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  sessionVal;
  name: String = null;
  products = new IProduct(null, null, null, null, null, null, null, null);
  //products: IProduct;

  constructor(@Inject(LOCAL_STORAGE) public storage: WebStorageService, public serviceObject: ProductsService, public router: Router) { }

  ngOnInit(product) {
    this.products = product;
    console.log(product);
    alert('hai');
    //this.router.navigate(['update']);
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

  updateProduct(product) {
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
        this.products = product;
        console.log(this.products);
        // this.router.navigate(['update']);
      }
      else
      {
        this.router.navigate(['']);
      }
    }

    return (this.products);
  }  

}
