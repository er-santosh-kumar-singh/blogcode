import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BlogPostService } from '../services/blog-post.service';
import { BlogPost } from '../models/blog-post';
import { ApiResponse } from '../../models/api-Response.model';

@Component({
  selector: 'app-blogpost-list',
  imports: [RouterModule, CommonModule],
  templateUrl: './blogpost-list.component.html',
  styleUrl: './blogpost-list.component.css'
})
export class BlogpostListComponent implements OnInit {
  model?: BlogPost[];
  apiResponse?: ApiResponse<any>;
  isLoading: boolean = true;

  constructor(private blogPostService: BlogPostService) { }

  ngOnInit(): void {
    this.blogPostService.getBlogPosts().subscribe({
      next: (response) => {
        this.apiResponse = response;
        if (response.isSuccess) {
         this.isLoading =false;
          this.model = this.apiResponse.result as BlogPost[];

        }
      },
      error: (err) => console.log('Error occured while fetching the blog post details'),
    });
  }


}
