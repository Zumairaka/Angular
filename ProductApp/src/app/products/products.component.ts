import { Router} from '@angular/router';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Component, OnInit, Inject } from '@angular/core';
import { ProductsService } from '../products.service';
import { IProduct } from './product.model';

@Component ({
  selector: 'app-products',
  templateUrl: './products.component.html',
  providers: [ProductsService],
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: IProduct[];
  product: IProduct;
  flag = false;
  status: String;
  // tslint:disable-next-line:ban-types
  value: String = 'Show Image';
  sessionVal;
  name;

  constructor(@Inject(LOCAL_STORAGE) public storage: WebStorageService, public serviceObject: ProductsService, private router: Router) { }

  ngOnInit(): void {
    this.sessionVal = this.storage.get('uname');
    if (this.sessionVal === '') {
      this.router.navigate(['']);
    } else {
      if (this.sessionVal !== '') {
        this.name = this.sessionVal;
        this.serviceObject.getProductList().subscribe((data) => {
          this.products = JSON.parse(JSON.stringify(data));
        });
      }
    }
  }

  showImage(): void {
    if (this.flag === false) { // this.flag = !this.flag :- one line is enough
      this.flag = true;
      this.value = 'Hide Image';
    } else if (this.flag === true)
    {
      this.flag = false;
      this.value = 'Show Image';
    }
  }

  link(no): void {
    if (no === 1) {
      this.router.navigate(['products']);
    } else if (no === 2) {
      this.router.navigate(['addProducts']);
    }
  }

  delete(id) {
    this.serviceObject.deleteProduct(id)
      .subscribe((data) => {
        console.log(JSON.parse(JSON.stringify(data)).Status);
        this.status = JSON.parse(JSON.stringify(data)).Status;
        if (this.status === 'Success') {
          this.router.navigateByUrl('', { skipLocationChange: true })
            .then(() => {
            this.router.navigate(['products']);
          });
        } else {
          alert(this.status);
        }
      });
  }

  edit(product) {
    // console.log(product);
    // this.serviceObject.product = product;
    this.product = product;
    this.router.navigate(['update', this.product]);
  }

  logout(): void {
    this.storage.remove('uname');
    this.router.navigate(['']);
  }

}
