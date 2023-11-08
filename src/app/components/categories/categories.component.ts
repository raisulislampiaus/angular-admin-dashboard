import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Category } from 'src/app/models/category';
import { CategoriesDataService } from 'src/app/services/categories-data.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
interface SortOptions {
  key: string;
  reverse: boolean;
}
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  endSubs$: Subject<any> = new Subject();
  sortOptions: SortOptions = { key: 'name', reverse: false };

  constructor(
    private categoriesService: CategoriesDataService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this._getCategories();
  }

  ngOnDestroy() {
    this.endSubs$.complete();
  }

  deleteCategory(categoryId: string) {
    const confirmation = confirm('Do you want to delete this Category?');

    if (confirmation) {
      this.categoriesService
        .deleteCategory(categoryId)
        .pipe(takeUntil(this.endSubs$))
        .subscribe(
          () => {
            this._getCategories();
            this.snackBar.open('Category is deleted!', 'Close', {
              duration: 2000, // Adjust the duration as needed
            });
          },
          () => {
            this.snackBar.open('Category is not deleted!', 'Close', {
              duration: 2000, // Adjust the duration as needed
            });
          }
        );
    }
  }

  updateCategory(categoryid: string) {
    this.router.navigateByUrl(`categories/form/${categoryid}`);
  }

  private _getCategories(){
    this.categoriesService
      .getCategories()
      .pipe(takeUntil(this.endSubs$))
      .subscribe((categories) => {
        this.categories = categories;
      });
  }

  sortTable(key: string) {
    if (this.sortOptions.key === key) {
      // Toggle sorting direction
      this.sortOptions.reverse = !this.sortOptions.reverse;
    } else {
      // Set the new key for sorting
      this.sortOptions.key = key;
      this.sortOptions.reverse = false;
    }
  
    this.categories.sort((a, b) => {
      const propA = (a as any)[this.sortOptions.key];
      const propB = (b as any)[this.sortOptions.key];
  
      // Compare based on sorting direction (ascending or descending)
      const comparison = propA.localeCompare(propB);
      return this.sortOptions.reverse ? -comparison : comparison;
    });
  }
  
}
