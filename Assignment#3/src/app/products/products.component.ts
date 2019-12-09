import { UpdateComponent } from './../update/update.component';
import { Router } from '@angular/router';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Component, OnInit, Inject } from '@angular/core';
import { ProductsService } from '../products.service';
import { IProduct } from './product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  providers:[ProductsService, UpdateComponent],
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: IProduct[];
  flag: boolean = false;
  value: String = "Show Image";
  sessionVal;
  name;

  constructor(@Inject(LOCAL_STORAGE) public storage: WebStorageService, public serviceObject: ProductsService, private router: Router, public update: UpdateComponent) { }

  ngOnInit():void {
    this.sessionVal = this.storage.get('uname');
    if (this.sessionVal == '')
    {
      this.router.navigate(['']);
    }
    else
    {
      if(this.sessionVal == 'zumi')
      {
        this.name = 'zumi'
        this.serviceObject.getProductList().subscribe((data) => {
          this.products = JSON.parse(JSON.stringify(data));
        }); 
      }
      else
      {
        this.router.navigate(['']);
      } 
    }
  }
  
  showImage():void {
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

  link(no):void {
    if(no == 1)
      this.router.navigate(['products']);
    else if(no == 2)
      this.router.navigate(['addProducts']);
  }
  
  delete(id) {
    this.serviceObject.deleteProduct(id);
    alert('Deletion Successful');
    this.router.navigate(['products']);
  }

  edit(product) {
    this.update.ngOnInit(product);
  }

  logout():void {
    this.storage.remove('uname');
    this.router.navigate(['']);
  }

}
