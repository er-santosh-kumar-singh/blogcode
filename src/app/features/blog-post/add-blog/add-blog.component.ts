import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddBlogPost } from '../models/add-blog-post.model';

@Component({
  selector: 'app-add-blog',
  imports: [FormsModule, DatePipe,CommonModule],
  templateUrl: './add-blog.component.html',
  styleUrl: './add-blog.component.css'
})
export class AddBlogComponent {
  model: AddBlogPost;

  constructor(){
    this.model={
      title:'',
      author:'',
      content:'',
      featuredImageUrl:'',
      isVisible:true,
      publishedDate:new Date(),
      shortDescription:'',
      urlHandle:''
    }
  }

  onFormSubmit():void{
console.log(this.model);
  }

}
