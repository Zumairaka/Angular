import { Injectable } from '@angular/core';
import { IProduct } from './products/product.model';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient, public router: Router) { }

  getProductList() {
      return this.http.get('http://localhost:3000/products');
  }

  newProduct(item) {
    return this.http.post('http://localhost:3000/insert', {'product': item}).subscribe(() => {
      this.router.navigate(['addProducts']);
    });
  }

  newUser(user) {
    return this.http.post('http://localhost:3000/signup', {'user': user}).subscribe((data) => {
      this.router.navigate(['login']);
    });
  }

  deleteProduct(id) {
    return this.http.post('http://localhost:3000/delete', {'id' : id}).subscribe(() => {
      this.router.navigate(['products']);
    });
  }
}
