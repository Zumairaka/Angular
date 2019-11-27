import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TemplateFormComponent } from './template-form/template-form.component';
import { ReactiveComponent } from './reactive/reactive.component';

const routes: Routes = [
                        {path:'',component:HomeComponent},
                        {path:'template',component:TemplateFormComponent},
                        {path:'reactive',component:ReactiveComponent}
                       ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
