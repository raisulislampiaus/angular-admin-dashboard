import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/models/category';
import { CategoriesDataService } from 'src/app/services/categories-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category-form',
  templateUrl: './add-category-form.component.html',
  styleUrls: ['./add-category-form.component.css'],
})
export class AddCategoryFormComponent implements OnInit, OnDestroy {
  form: FormGroup = new FormGroup({});
  isSubmitted = false;
  editmode = false;
  currentCategoryId: string = '';
  endsubs$: Subject<any> = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesDataService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
      color: ['#FF5733'],
    });
    this._checkEditMode();
  }

  ngOnDestroy() {
    this.endsubs$.complete();
  }
  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }

    const category: Category = {
      id: this.currentCategoryId,
      name: this.form.get('name')?.value,
      icon: this.form.get('icon')?.value,
      color: this.form.get('color')?.value,
    };

    // this.categoriesService.createCategory(category).subscribe(
    //   () => {
    //     // Category created successfully, show a success toast
    //     this.snackBar.open('Category created successfully', 'Close', {
    //       duration: 2000, // Duration in milliseconds
    //     });
    //   },
    //   (error) => {
    //     // Error occurred, show an error toast
    //     this.snackBar.open('Failed to create category', 'Close', {
    //       duration: 2000, // Duration in milliseconds
    //     });
    //     console.error(error);
    //   }
    // );
    // this._addCategory(category)
    if (this.editmode) {
      this._updateCategory(category);
    } else {
      this._addCategory(category);
    }
  }

  onCancle() {
    this.location.back();
  }

  private _addCategory(category: Category) {
    this.categoriesService
      .createCategory(category)
      .pipe(takeUntil(this.endsubs$))
      .subscribe(
        (createdCategory: Category) => {
          // Category created successfully, show a success snackbar
          this.snackBar.open(
            `Category ${createdCategory.name} is created!`,
            'Close',
            {
              duration: 2000, // Duration in milliseconds
            }
          );

          // You can add a delay before navigating back (optional)
          setTimeout(() => {
            this.location.back();
          }, 2000); // 2000 milliseconds (2 seconds) delay
        },
        () => {
          // Error occurred, show an error snackbar
          this.snackBar.open('Category is not created!', 'Close', {
            duration: 2000, // Duration in milliseconds
          });
        }
      );
  }

  private _updateCategory(category: Category) {
    this.categoriesService
      .updateCategory(category)
      .pipe(takeUntil(this.endsubs$))
      .subscribe(
        () => {
          // Category updated successfully, show a success snackbar
          this.snackBar.open('Category is updated!', 'Close', {
            duration: 2000, // Duration in milliseconds
          });

          // You can navigate back after a delay (optional)
          setTimeout(() => {
            this.router.navigate(['/categories']); // Adjust the route as needed
          }, 2000); // 2000 milliseconds (2 seconds) delay
        },
        () => {
          // Error occurred, show an error snackbar
          this.snackBar.open('Category is not updated!', 'Close', {
            duration: 2000, // Duration in milliseconds
          });
        }
      );
  }

  private _checkEditMode() {
    this.route.params.pipe(takeUntil(this.endsubs$)).subscribe((params) => {
      if (params['id']) {
        // Use square brackets to access 'id'
        this.editmode = true;
        this.currentCategoryId = params['id']; // Use square brackets to access 'id'
        this.categoriesService
          .getCategory(params['id']) // Use square brackets to access 'id'
          .pipe(takeUntil(this.endsubs$))
          .subscribe((category) => {
            this.categoryForm['name'].setValue(category.name);
            this.categoryForm['color'].setValue(category.color);
            this.categoryForm['icon'].setValue(category.icon);
           
          });
      }
    });
  }

  get categoryForm() {
    return this.form.controls;
  }
}
