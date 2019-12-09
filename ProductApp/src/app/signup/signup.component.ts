import { ValidatePassword } from './../must-match/validate-password';
import { UserData } from './signup.model';
import { ProductsService } from './../products.service';
import { Router, RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  providers: [ProductsService],
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  userData = new UserData(null, null, null, null, null, null, null, null, null);
  signupForm: FormGroup;
  submitted = false;
  status: string;

  constructor(public router: Router, private formBuilder: FormBuilder, public serviceObject: ProductsService) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      uname: ['', [Validators.required, Validators.minLength(9)]],
      password: ['', [Validators.required, Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)]],
      confirmPassword: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
      phone: ['', [Validators.required, Validators.pattern(/(6|7|8|9)\d{9}$/)]],
      gender: ['', Validators.required],
      address: ['', Validators.required]}, {
        validator: ValidatePassword.MatchPassword });
  }

  get f() { return this.signupForm.controls; }

  signUp(): void {
    this.submitted = true;
    if (this.signupForm.invalid == true) {
      return;
    } else {
      this.userData.fname = this.signupForm.get('fname').value;
      this.userData.lname = this.signupForm.get('lname').value;
      this.userData.uname = this.signupForm.get('uname').value;
      this.userData.password = this.signupForm.get('password').value;
      this.userData.confirmPassword = this.signupForm.get('confirmPassword').value;
      this.userData.email = this.signupForm.get('email').value;
      this.userData.phone = this.signupForm.get('phone').value;
      this.userData.gender = this.signupForm.get('gender').value;
      this.userData.address = this.signupForm.get('address').value;
      console.log(this.userData);
      this.serviceObject.newUser(this.userData)
        .subscribe((data) => {
          console.log(JSON.parse(JSON.stringify(data)).Status);
          this.status = JSON.parse(JSON.stringify(data)).Status;
          if (this.status == 'Success') {
          this.router.navigateByUrl('', { skipLocationChange: true })
            .then(() => {
            alert('Signup is Successful');
            this.router.navigate(['']);
          });
        } else {
          alert(this.status);
        }
        });
    }
  }

  cancel(): void {
    this.router.navigate(['']);
  }
}
