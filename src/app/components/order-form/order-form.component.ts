import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Order } from 'src/app/models/order';
import { ORDER_STATUS } from 'src/app/models/order.constants';
import { OrderService } from 'src/app/services/order.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';



@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit, OnDestroy {
 
  // Corrected: order is a single Order object, not an array
  order: Order = new Order();

  orderStatuses: { id: string; name: any; }[] = [];

  selectedStatus: any;
  endsubs$: Subject<any> = new Subject();

  constructor(
    private orderService: OrderService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this. _mapOrderStatus();
    // Fetch order data
    this._getOrder();
  }

  ngOnDestroy() {
  
    this.endsubs$.complete();
  }

 
  
  private _mapOrderStatus() {
    this.orderStatuses = Object.keys(ORDER_STATUS).map((key:any) => {
      return {
        id: key,
        name: ORDER_STATUS[key].label
      };
    });
  }

  private _getOrder() {
    this.route.params.subscribe((params) => {
      if (params['id']) { // Access 'id' using square brackets
        this.orderService
          .getOrder(params['id'])
          .pipe(takeUntil(this.endsubs$))
          .subscribe((order) => {
            this.order = order;
            this.selectedStatus = order.status;
          });
      }
    });
  }

  onStatusChange(event:any) {
    if (this.order.id !== undefined) {
      this.orderService
        .updateOrder({ status: event.value }, this.order.id)
        .pipe(takeUntil(this.endsubs$))
        .subscribe(
          () => {
            this.snackBar.open('Order is updated!', 'Success', {
              duration: 3000, // Adjust the duration as needed
              panelClass: 'success-snackbar' // You can define custom CSS classes for styling
            });
          },
          () => {
            this.snackBar.open('Failed to update order!', 'Error', {
              duration: 3000,
              panelClass: 'error-snackbar'
            });
          }
        );
    } else {
      this.snackBar.open('Invalid order ID', 'Error', {
        duration: 3000,
        panelClass: 'error-snackbar'
      });
    }
  }
}
