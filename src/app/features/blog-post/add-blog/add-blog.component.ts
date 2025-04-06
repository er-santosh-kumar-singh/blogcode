import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddBlogPost } from '../models/add-blog-post.model';
import { BlogPostService } from '../services/blog-post.service';
import { Router } from '@angular/router';
import { response } from 'express';
import { Subscription } from 'rxjs';
import {MarkdownModule} from 'ngx-markdown'

@Component({
  selector: 'app-add-blog',
  imports: [FormsModule, DatePipe, CommonModule, MarkdownModule],
  templateUrl: './add-blog.component.html',
  styleUrl: './add-blog.component.css'
})
export class AddBlogComponent implements OnDestroy {
  model: AddBlogPost;
  addBlogPostSubcriptoin?: Subscription;

  constructor(private blogPostService: BlogPostService, private router: Router) {
    this.model = {
      title: '',
      author: '',
      content: '',
      featuredImageUrl: '',
      isVisible: true,
      publishedDate: new Date(),
      shortDescription: '',
      urlHandle: ''
    }
  }


  onFormSubmit(): void {
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
