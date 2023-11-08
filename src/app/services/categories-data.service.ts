import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesDataService {

  url = "https://angular-dashboard-8x4r.onrender.com/api/v1/categories";

  constructor(private http:HttpClient) { }
  getCategories(): Observable<Category[]>
  {
    return this.http.get<Category[]>(this.url);
  }
  getCategory(categoryId: string): Observable<Category> {
    return this.http.get<Category>(`${this.url}/${categoryId}`);
  }
  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.url, category);
  }
  updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.url}/${category.id}`, category);
  }

  deleteCategory(categoryId: string): Observable<any> {
    return this.http.delete<any>(`${this.url}/${categoryId}`);
  }
}
