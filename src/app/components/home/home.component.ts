import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsDataService } from 'src/app/services/products-data.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import { combineLatest, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { OrderService } from 'src/app/services/order.service';
import { MatSnackBar } from '@angular/material/snack-bar';


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
   
   
  ) {}
  ngOnInit(): void {
    combineLatest([
      this.productService.getProductsCount(),
      this.userService.getUsersCount(),
      this.orderService.getOrdersCount(),
      this.orderService.getTotalSales()
    ])
      .pipe(takeUntil(this.endsubs$))
      .subscribe((values) => {
        this.statistics = values;
      })
     .pipe(takeUntil(this.endsubs$))
      .subscribe(
        (values) => {
          this.statistics = values;
          this.loading = false; 
        },
        (error) => {
          console.error('Error fetching data', error);
          this.loading = false; 
        }
      );
    
  }

  ngOnDestroy() {
    this.endsubs$.complete();
  }

  
  
}
