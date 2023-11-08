import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsDataService } from 'src/app/services/products-data.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import { combineLatest, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { OrderService } from 'src/app/services/order.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  implements OnInit, OnDestroy{
  statistics: number[] = [];
  loading: boolean = true;
  endsubs$: Subject<any> = new Subject();
  
  constructor(
    private userService: UserServiceService,
    private productService: ProductsDataService,
    private orderService: OrderService,
    private snackBar: MatSnackBar,
    private spinner: NgxSpinnerService,
   
  ) {}
  ngOnInit(): void {
    this.spinner.show();
    combineLatest([
      
      this.productService.getProductsCount(),
      this.userService.getUsersCount(),
      this.orderService.getOrdersCount(),
      this.orderService.getTotalSales()
    ])
      .pipe(takeUntil(this.endsubs$))
      .subscribe((values) => {
        this.statistics = values;
        setTimeout(() => {
          this.spinner.hide();
        }, 1000);
      });
    
  }

  ngOnDestroy() {
    this.endsubs$.complete();
  }

  
  
}
