import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {  Order } from 'src/app/models/order';
import { ORDER_STATUS } from 'src/app/models/order.constants';
import { OrderService } from 'src/app/services/order.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit, OnDestroy{
  orders: Order[] = [];
  orderStatus = ORDER_STATUS;
 
   
  endsubs$: Subject<any> = new Subject();

  constructor(
    private orderService: OrderService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this._getOrders();
    console.log('orderStatus:', this.orderStatus);
  }
  ngOnDestroy() {
   
    this.endsubs$.complete();
  }

  _getOrders() {
    this.orderService
      .getOrders()
      .pipe(takeUntil(this.endsubs$))
      .subscribe((orders) => {
        this.orders = orders;
      });
  }

  showOrder(orderId: string) {
    this.router.navigateByUrl(`orders/${orderId}`);
  }



  deleteOrder(orderId: string) {
    const confirmation = confirm('Do you want to delete this Order?');

    if (confirmation) {
      this.orderService
        .deleteOrder(orderId)
        .pipe(takeUntil(this.endsubs$))
        .subscribe(
          () => {
            this._getOrders();
            this.snackBar.open('order is deleted!', 'Close', {
              duration: 2000, // Adjust the duration as needed
            });
          },
          () => {
            this.snackBar.open('order is not deleted!', 'Close', {
              duration: 2000, // Adjust the duration as needed
            });
          }
        );
    }
  }
}
