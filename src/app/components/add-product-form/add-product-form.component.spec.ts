import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductFormComponent } from './add-product-form.component';

describe('AddProductFormComponent', () => {
  let component: AddProductFormComponent;
  let fixture: ComponentFixture<AddProductFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddProductFormComponent]
    });
    fixture = TestBed.createComponent(AddProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
