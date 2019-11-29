import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { AddProductsComponent } from './add-products/add-products.component';

const routes: Routes = [
                        {path:'products',component:ProductsComponent},
                        {path:'addProducts',component:AddProductsComponent}
                       ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
