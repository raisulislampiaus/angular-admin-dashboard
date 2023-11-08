import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { AddProductFormComponent } from './components/add-product-form/add-product-form.component';
import { AddCategoryFormComponent } from './components/add-category-form/add-category-form.component';
import { UsersComponent } from './components/users/users.component';
import { OrderComponent } from './components/order/order.component';
import { OrderFormComponent } from './components/order-form/order-form.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "products",
    component: ProductsComponent
  },
  {
    path: "products/form",
    component: AddProductFormComponent
  },
  {
    path: "products/form/:id",
    component: AddProductFormComponent
  },
  {
    path: "categories",
    component: CategoriesComponent
  },
  {
    path: "categories/form",
    component: AddCategoryFormComponent
  },
  {
    path: "categories/form/:id",
    component: AddCategoryFormComponent
  },
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'orders',
    component: OrderComponent
  },
  {
    path: 'orders/:id',
    component: OrderFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
