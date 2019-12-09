import { ProductsService } from './../products.service';
import { Router, RouterModule } from '@angular/router';
import { Component, OnInit, Inject } from '@angular/core';
import { LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {};
  submitted = false;
  status: string;
  loginForm: FormGroup;
  // tslint:disable-next-line:max-line-length
  constructor(@Inject(LOCAL_STORAGE) public storage: WebStorageService, private formBuilder: FormBuilder, public router: Router, private serviceObject: ProductsService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      uname: ['', [Validators.required, Validators.minLength(9)]],
      password: ['', [Validators.required, Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)]]
    });
  }

  get f() { return this.loginForm.controls; }

  register(): void {
    this.router.navigate(['signUp']);
  }
  login(): void {
    this.submitted = true;
    if (this.loginForm.invalid === true) {
      return;
    }
    this.model.uname = this.loginForm.get('uname').value;
    this.model.password = this.loginForm.get('password').value;
    console.log(this.model);

    this.serviceObject.getUser(this.model)
    .subscribe((result) => {
      this.status = JSON.parse(JSON.stringify(result)).Status;
      console.log(this.status);
      if (this.status === 'Success') {
        this.router.navigate(['products']);
        this.storage.set('uname', this.model.uname);
      } else {
        alert(this.status);
      }

    });
  }

}
