import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddBlogPost } from '../models/add-blog-post.model';
import { BlogPostService } from '../services/blog-post.service';
import { Router } from '@angular/router';
import { response } from 'express';
import { Observable, Subscription } from 'rxjs';
import {MarkdownModule} from 'ngx-markdown'
import { CategoryService } from '../../category/category.service';
import { Category } from '../../category/models/category.model';

@Component({
  selector: 'app-add-blog',
  imports: [FormsModule, DatePipe, CommonModule, MarkdownModule],
  templateUrl: './add-blog.component.html',
  styleUrl: './add-blog.component.css'
})
export class AddBlogComponent implements OnInit, OnDestroy {
  model: AddBlogPost;
  addBlogPostSubcriptoin?: Subscription;
  getCategory$?: Observable<Category[]>;

  constructor(private blogPostService: BlogPostService, private categoryService:CategoryService, private router: Router) {
    this.model = {
      title: '',
      author: '',
      content: '',
      featuredImageUrl: '',
      isVisible: true,
      publishedDate: new Date(),
      shortDescription: '',
      urlHandle: '',
      categories:[],
    }
  }
  ngOnInit(): void {
    this.getCategory$ = this.categoryService.getAllCategories();
  }


  onFormSubmit(): void {
    console.log(this.model);
    this.addBlogPostSubcriptoin = this.blogPostService.addBlogPost(this.model).subscribe({
      next: (response) => {
        console.log('Record added successfully...');
        this.router.navigateByUrl('admin/blogposts');
      }
    })
  }

  ngOnDestroy(): void {
    this.addBlogPostSubcriptoin?.unsubscribe();
  }

}
