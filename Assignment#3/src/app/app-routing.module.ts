import { UpdateComponent } from './update/update.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { AddProductsComponent } from './add-products/add-products.component';

const routes: Routes = [
                        {path: '', component: LoginComponent},
                        {path: 'products', component: ProductsComponent},
                        {path: 'addProducts', component: AddProductsComponent},
                        {path: 'signUp', component: SignupComponent},
                        {path: 'update', component: UpdateComponent}                        
                       ];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
