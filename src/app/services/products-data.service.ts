import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/products';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class ProductsDataService {
  url = 'https://angular-dashboard-8x4r.onrender.com/api/v1/products';

  constructor(private http: HttpClient) {}
  products(categoriesFilter?: string[]): Observable<Product[]> {
    let params = new HttpParams();
    if (categoriesFilter) {
      params = params.append('categories', categoriesFilter.join(','));
    }

    return this.http.get<Product[]>(this.url, { params: params });
  }

  getProduct(productId: string): Observable<Product> {
    return this.http.get<Product>(`${this.url}/${productId}`);
  }

  searchProducts(query: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}?query=${query}`);
  }

  createProduct(productData: FormData): Observable<Product> {
    return this.http.post<Product>(this.url, productData);
  }

  

  updateProduct(productData: FormData, productid: string): Observable<Product> {
    return this.http.put<Product>(`${this.url}/${productid}`, productData);
  }

  deleteProduct(productId: string): Observable<any> {
    return this.http.delete<any>(`${this.url}/${productId}`);
  }

  getProductsCount(): Observable<number> {
    return this.http
      .get<number>(`${this.url}/get/count`)
      .pipe(map((objectValue: any) => objectValue.productCount));
  }

  getFeaturedProducts(count: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}/get/featured/${count}`);
  }
}
