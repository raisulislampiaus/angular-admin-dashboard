import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/products';
import { ProductsDataService } from 'src/app/services/products-data.service';
import { CategoriesDataService } from 'src/app/services/categories-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product-form',
  templateUrl: './add-product-form.component.html',
  styleUrls: ['./add-product-form.component.css']
})
export class AddProductFormComponent {
  form: FormGroup = new FormGroup({});
  isSubmitted = false;
  editmode = false;
  catagories: Category[] = [];

  imageDisplay!: string | ArrayBuffer;
  currentProductId: string = '';
  endsubs$: Subject<any> = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesDataService,
    private productsService: ProductsDataService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._initForm();
    this._getCategories();
    this._checkEditMode();
  }

  ngOnDestroy() {
    this.endsubs$.complete();
  }
  private _initForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      countInStock: ['', Validators.required],
      description: ['', Validators.required],
      richDescription: [''],
      image: ['', Validators.required],
      isFeatured: [false]
    });
  }
  private _getCategories() {
    this.categoriesService
      .getCategories()
      .pipe(takeUntil(this.endsubs$))
      .subscribe((categories) => {
        this.catagories = categories;
      });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
   
    const productFormData = new FormData();
    Object.keys(this.productForm).map((key) => {
      productFormData.append(key, this.productForm[key].value);
    });
    if (this.editmode) {
      this._updateProduct(productFormData);
    } else {
      this._addProduct(productFormData);
    }
    
  }

  onCancle() {
    this.location.back();
  }

  private _addProduct(productData: FormData) {
    this.productsService
      .createProduct(productData)
      .pipe(takeUntil(this.endsubs$))
      .subscribe(
        (product: Product) => {
          // Category created successfully, show a success snackbar
          this.snackBar.open(
            `Product ${product.name} is created!`,
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
          this.snackBar.open('Product is not created!', 'Close', {
            duration: 2000, // Duration in milliseconds
          });
        }
      );
  }

  private _updateProduct(productFormData: FormData) {
    this.productsService
      .updateProduct(productFormData, this.currentProductId)
      .pipe(takeUntil(this.endsubs$))
      .subscribe(
        () => {
          // Category updated successfully, show a success snackbar
          this.snackBar.open('Product is updated!', 'Close', {
            duration: 2000, // Duration in milliseconds
          });

          // You can navigate back after a delay (optional)
          setTimeout(() => {
            this.router.navigate(['/products']); // Adjust the route as needed
          }, 2000); // 2000 milliseconds (2 seconds) delay
        },
        () => {
          // Error occurred, show an error snackbar
          this.snackBar.open('Product is not updated!', 'Close', {
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
        this.currentProductId = params['id']; // Use square brackets to access 'id'
        this.productsService
          .getProduct(params['id']) // Use square brackets to access 'id'
          .pipe(takeUntil(this.endsubs$))
          .subscribe((product) => {
            this. productForm['name'].setValue(product.name);
            if (product.category) {
              this.productForm['category'].setValue(product.category.id);
            }
            this. productForm['brand'].setValue(product.brand);
            this. productForm['price'].setValue(product.price);
            this. productForm['countInStock'].setValue(product.countInStock);
            this. productForm['isFeatured'].setValue(product.isFeatured);
            this. productForm['description'].setValue(product.description);
            this. productForm['richDescription'].setValue(product.richDescription);
            this.imageDisplay = product.image as string;
            this. productForm['image'].setValidators([]);
            this. productForm['image'].updateValueAndValidity();
           
          });
      }
    });
  }

  onImageUpload(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput?.files?.[0];
  
    if (file) {
      this.form.patchValue({ image: file });
  
      const imageControl = this.form.get('image');
      if (imageControl) { 
        imageControl.updateValueAndValidity();
      }
  
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result as string | ArrayBuffer;
      };
      fileReader.readAsDataURL(file);
    }
  }
  
  
  get  productForm() {
    return this.form.controls;
  }
}
