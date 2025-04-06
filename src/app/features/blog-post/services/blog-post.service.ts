import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-post.model';
import { Observable } from 'rxjs';
import { BlogPost } from '../models/blog-post';
import { environment } from '../../../environments/environment.development';
import { ApiResponse } from '../../models/api-Response.model';

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {

  constructor(private http: HttpClient) { }

  addBlogPost(model: AddBlogPost): Observable<BlogPost> {
    return this.http.post<BlogPost>(`${environment.apiBaseUrl}blogpost`, model);
  }
  getBlogPosts(): Observable<ApiResponse<BlogPost[]>> {
    return this.http.get<ApiResponse<BlogPost[]>>(`${environment.apiBaseUrl}BlogPost`);
  }

}
