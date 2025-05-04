import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';
import { AddBlogPost } from '../models/add-blog-post.model';
import { BlogPost } from '../models/blog-post';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogPostService } from '../services/blog-post.service';
import { Observable, Subscription } from 'rxjs';
import { Category } from '../../category/models/category.model';
import { CategoryService } from '../../category/category.service';
import { UpdateBlogPost } from '../models/update-blog-post.model';
import { response } from 'express';

@Component({
  selector: 'app-edit-blogpost',
  imports: [FormsModule, DatePipe, CommonModule, MarkdownModule],
  templateUrl: './edit-blogpost.component.html',
  styleUrl: './edit-blogpost.component.css'
})
export class EditBlogpostComponent implements OnInit, OnDestroy {
  id: string | null = null;
  model?: BlogPost;
  getCategory$?: Observable<Category[]>;
  selectedCategory?: string[];
  routeSubscription?: Subscription;
  getBlogPostSubscription?: Subscription;

  constructor(private route: ActivatedRoute, private router: Router, private blogPostService: BlogPostService, private categoryService: CategoryService) {

  }

  onEditBlogPost(): void {
    if (this.model && this.id) {
      var updateBlogPost: UpdateBlogPost = {
        author: this.model.author,
        content: this.model.content,
        shortDescription: this.model.shortDescription,
        isVisible: this.model.isVisible,
        featuredImageUrl: this.model.featuredImageUrl,
        title: this.model.title,
        urlHandle: this.model.urlHandle,
        publishedDate: this.model.publishedDate,
        categories: this.selectedCategory ?? [],
      };
      this.blogPostService.updateBlogPost(this.id, updateBlogPost).subscribe({
        next: (response) => {
          this.router.navigateByUrl('admin/blogposts');
        }
      })

    }
  }

  ngOnInit(): void {
    this.getCategory$ = this.categoryService.getAllCategories();
    this.routeSubscription = this.route.paramMap.subscribe({
      next: (param) => {
        this.id = param.get('id');
        console.log(this.id);
        if (this.id) {
          this.getBlogPostSubscription = this.blogPostService.getBlogPostById(this.id).subscribe({
            next: (response) => {
              this.model = response.result;
              debugger;
              console.log(this.model);
              this.selectedCategory = response.result.categories.map((u) => u.id);
            }
          });
        }
      }
    })
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe;
    this.getBlogPostSubscription?.unsubscribe;
  }

}
