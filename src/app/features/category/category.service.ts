import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from './models/category.model';
import { environment } from '../../environments/environment.development';
import { AddCategoryRequest } from './models/add-category-request.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getAllCategories():Observable<Category[]>{
    return this.http.get<Category[]>(`${environment.apiBaseUrl}category`);
  }

  addCategory(model: AddCategoryRequest):Observable<void>{
   return this.http.post<void>(`${environment.apiBaseUrl}category`,model);

  }

}
