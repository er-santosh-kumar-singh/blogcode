import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogPost } from '../../blog-post/models/blog-post';
import { ActivatedRoute } from '@angular/router';
import { BlogPostService } from '../../blog-post/services/blog-post.service';
import { CommonModule } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-blog-details',
  imports: [CommonModule, MarkdownModule],
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.css'
})
export class BlogDetailsComponent implements OnInit {
  urlHandle: string = '';
  blogPostDetail$: BlogPost | undefined;

  constructor(private route: ActivatedRoute, private blogPostSevice: BlogPostService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.urlHandle = params['urlHandle'];
      console.log(this.urlHandle);
      if (this.urlHandle) {
        this.blogPostSevice.getBlogPostByUrlHandle(this.urlHandle).subscribe({
          next: (response) => {
            if (response.isSuccess) {
              this.blogPostDetail$ = response.result as BlogPost;
              console.log(this.blogPostDetail$);
            }
          },
          error: (err) => console.error('Error occured while fetching the blog posts...'),
        })
      }

    });
  }

}
