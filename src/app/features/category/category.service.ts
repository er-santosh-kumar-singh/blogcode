import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from './models/category.model';
import { environment } from '../../environments/environment.development';
import { AddCategoryRequest } from './models/add-category-request.model';
import { UpdateCategoryRequest } from './models/update-category-request.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.apiBaseUrl}category`);
  }

  addCategory(model: AddCategoryRequest): Observable<void> {
    return this.http.post<void>(`${environment.apiBaseUrl}category`, model);

  }
  getCategoryById(id: string): Observable<Category> {
    return this.http.get<Category>(`${environment.apiBaseUrl}category/${id}`);
  }
  updateCategory(id: string, updateCategoryRequest: UpdateCategoryRequest): Observable<void> {
    return this.http.put<void>(`${environment.apiBaseUrl}category/${id}`, updateCategoryRequest);
  }

  deleteCategory(id:string):Observable<Category>{
    return this.http.delete<Category>(`${environment.apiBaseUrl}category/${id}`);
  }

}
