import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogPost } from '../../blog-post/models/blog-post';
import { BlogPostService } from '../../blog-post/services/blog-post.service';
import { response } from 'express';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [RouterModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  blogPosts?: BlogPost[];
  constructor(private blogPostService: BlogPostService){}


  ngOnInit(): void {
   this.blogPostService.getBlogPosts().subscribe({
    next:(response)=>{
      if(response.isSuccess){
        this.blogPosts=response.result as BlogPost[];
        console.log(this.blogPosts);
      }
    },
    error:(err)=> console.error('Error occured while fetching the blog posts...'),
   })
  }

}
