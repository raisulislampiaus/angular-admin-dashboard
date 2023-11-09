import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AddCategoryFormComponent } from './components/add-category-form/add-category-form.component';
import { AddProductFormComponent } from './components/add-product-form/add-product-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ColorPickerModule } from 'ngx-color-picker';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { UsersComponent } from './components/users/users.component';
import { OrderComponent } from './components/order/order.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { OrderFormComponent } from './components/order-form/order-form.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    HomeComponent,
    ProductsComponent,
    CategoriesComponent,
    AddCategoryFormComponent,
    AddProductFormComponent,
    UsersComponent,
    OrderComponent,
    OrderFormComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    ColorPickerModule,
    PaginationModule,
    NgxSpinnerModule,
    MatProgressSpinnerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
