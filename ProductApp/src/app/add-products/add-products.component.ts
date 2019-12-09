import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from './../products.service';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Router } from '@angular/router';
import { Component, OnInit, Inject } from '@angular/core';
import { IProduct } from '../products/product.model';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  providers: [ProductsService],
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent implements OnInit {
  productForm: FormGroup;
  submitted = false;
  sessionVal;
  status: String;
  // tslint:disable-next-line:max-line-length
  constructor(@Inject(LOCAL_STORAGE) public storage: WebStorageService, private formBuilder: FormBuilder, public serviceObject: ProductsService, public router: Router) { }

  productItem = new IProduct(null, null, null, null, null, null, null, null);

  ngOnInit() {
    this.sessionVal = this.storage.get('uname');
    if (this.sessionVal === '') {
      this.router.navigate(['']);
    } else {
      if (this.sessionVal !== '') {
        this.router.navigate(['addProducts']);
      }
    }

    this.productForm = this.formBuilder.group({
      productId: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      productName: ['', [Validators.required, Validators.minLength(2)]],
      productCode: ['', Validators.required],
      releaseDate: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(1), Validators.pattern(/^[0-9]*$/)]],
      starRating: ['', [Validators.required, Validators.min(1), Validators.max(5), Validators.pattern(/^[0-9]*$/)]],
      imageUrl: ['', Validators.required]
    });
  }

  get f() { return this.productForm.controls; }

  AddProduct() {
    this.submitted = true;
    if (this.productForm.invalid === true) {
      return;
    } else {
      this.productItem.productId = this.productForm.get('productId').value;
      this.productItem.productName = this.productForm.get('productName').value;
      this.productItem.productCode = this.productForm.get('productCode').value;
      this.productItem.releaseDate = this.productForm.get('releaseDate').value;
      this.productItem.description = this.productForm.get('description').value;
      this.productItem.price = this.productForm.get('price').value;
      this.productItem.starRating = this.productForm.get('starRating').value;
      this.productItem.imageUrl = this.productForm.get('imageUrl').value;

      this.serviceObject.newProduct(this.productItem)
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
  }

  link(no): void {
    if (no === 1) {
      this.router.navigate(['products']);
    } else if (no === 2) {
      this.router.navigate(['addProducts']);
    }
  }

  logout(): void {
    this.storage.remove('uname');
    this.router.navigate(['']);
  }
}


