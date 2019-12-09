import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Router, ActivatedRoute } from '@angular/router';
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

  productForm: FormGroup;
  submitted = false;
  sessionVal;
  status: string;
  product = new IProduct(null, null, null, null, null, null, null, null);
  item: any = {};
  // tslint:disable-next-line:max-line-length
  constructor(@Inject(LOCAL_STORAGE) public storage: WebStorageService, private formBuilder: FormBuilder, public serviceObject: ProductsService, public router: Router, public route: ActivatedRoute) { }

  ngOnInit() {
    this.sessionVal = this.storage.get('uname');
    if (this.sessionVal === '') {
      this.router.navigate(['']);
    } else {
      if (this.sessionVal !== '') {
        // console.log(history.state.data);
        // this.product = this.serviceObject.product;
        // console.log(this.product);
        // console.log(this.route.snapshot.params);
        this.item = this.route.snapshot.params;
      }
    }

    this.productForm = this.formBuilder.group({
      productId: [this.item.productId, [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      productName: [this.item.productName, [Validators.required, Validators.minLength(2)]],
      productCode: [this.item.productCode, Validators.required],
      releaseDate: [this.item.releaseDate, Validators.required],
      description: [this.item.description, Validators.required],
      price: [this.item.price, [Validators.required, Validators.min(1), Validators.pattern(/^[0-9]*$/)]],
      starRating: [this.item.starRating, [Validators.required, Validators.min(1), Validators.max(5), Validators.pattern(/^[0-9]*$/)]],
      imageUrl: [this.item.imageUrl, Validators.required]
    });
  }

  get f() { return this.productForm.controls; }

  saveUpdate() {
    this.submitted = true;
    if (this.productForm.invalid == true) {
      return;
    } else {
      this.product.productId = this.productForm.get('productId').value;
      this.product.productName = this.productForm.get('productName').value;
      this.product.productCode = this.productForm.get('productCode').value;
      this.product.releaseDate = this.productForm.get('releaseDate').value;
      this.product.description = this.productForm.get('description').value;
      this.product.price = this.productForm.get('price').value;
      this.product.starRating = this.productForm.get('starRating').value;
      this.product.imageUrl = this.productForm.get('imageUrl').value;

      this.serviceObject.SaveUpdate(this.product)
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
