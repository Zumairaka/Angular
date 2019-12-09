import { Injectable } from '@angular/core';
import { IProduct } from './products/product.model';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  product: IProduct;
  constructor(private http: HttpClient, public router: Router) { }

  getProductList() {
      return this.http.get('http://localhost:3000/products');
  }

  newProduct(item) {
    return this.http.post('http://localhost:3000/insert', {'product': item});
  }

  SaveUpdate(item) {
    return this.http.post('http://localhost:3000/update', {'product': item});
  }

  getUser(user) {
    console.log(user);
    return this.http.post('http://localhost:3000/login', user);
  }

  newUser(user) {
    return this.http.post('http://localhost:3000/signup', {'user': user});
  }

  deleteProduct(id) {
    return this.http.post('http://localhost:3000/delete', {'id' : id});
  }

  // setProduct(product) {
    // this.product = product;
    // console.log(this.product);
   // this.router.navigate(['update']);
  // }

  // getProduct() {
    // console.log(this.product);
    // return this.product;
 // }
}
