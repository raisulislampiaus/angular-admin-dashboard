import { Component, OnInit, OnDestroy} from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Product } from 'src/app/models/products';
import { ProductsDataService } from 'src/app/services/products-data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

interface SortOptions {
  key: string;
  reverse: boolean;
}
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy{
  allProducts: Product[] = [];
  endSubs$: Subject<any> = new Subject();
  sortOptions: SortOptions = { key: 'name', reverse: false };
 

  constructor(private productsService: ProductsDataService, private router: Router, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this._getProducts();
  }

  ngOnDestroy() {

    this.endSubs$.complete();
  }


  deleteProduct(productId: string) {
    const confirmation = confirm('Do you want to delete this Product?');

    if (confirmation) {
      this.productsService
        .deleteProduct(productId)
        .pipe(takeUntil(this.endSubs$))
        .subscribe(
          () => {
            this._getProducts();
            this.snackBar.open(' Product is deleted!', 'Close', {
              duration: 2000, // Adjust the duration as needed
            });
          },
          () => {
            this.snackBar.open(' Product is not deleted!', 'Close', {
              duration: 2000, // Adjust the duration as needed
            });
          }
        );
    }
  }

  updateProduct(productid: string) {
    this.router.navigateByUrl(`products/form/${productid}`);
  }

  private _getProducts(){
    this.productsService
    .products()
    .pipe(takeUntil(this.endSubs$))
    .subscribe((categories) => {
      this.allProducts = categories;
    });
  }


  // sortTable(key: string) {
  //   if (this.sortOptions.key === key) {
  //     // Toggle sorting direction
  //     this.sortOptions.reverse = !this.sortOptions.reverse;
  //   } else {
  //     // Set the new key for sorting
  //     this.sortOptions.key = key;
  //     this.sortOptions.reverse = false;
  //   }
  
  //   this.allProducts.sort((a, b) => {
  //     const propA = (a as any)[this.sortOptions.key];
  //     const propB = (b as any)[this.sortOptions.key];
  
  //     // Compare based on sorting direction (ascending or descending)
  //     const comparison = propA.localeCompare(propB);
  //     return this.sortOptions.reverse ? -comparison : comparison;
  //   });
  // }

  sortTable(key: string) {
    if (key === 'name' || key === 'price'  || key === 'brand') {
      this.sortOptions.reverse = this.sortOptions.key === key ? !this.sortOptions.reverse : false;
      this.sortOptions.key = key;
  
      this.allProducts.sort((a, b) => {
        const valueA = (a as any)[key];
        const valueB = (b as any)[key];
  
        if (key === 'price') {
          // Convert price properties to numbers for proper numeric sorting
          return this.sortOptions.reverse ? valueB - valueA : valueA - valueB;
        } else {
          // Sort by other properties (Tablename, category, brand) as strings
          const comparison = valueA.localeCompare(valueB);
          return this.sortOptions.reverse ? -comparison : comparison;
        }
      });
    }
  }
  
  
  
}
