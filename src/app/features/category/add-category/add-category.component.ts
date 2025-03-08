import { Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddCategoryRequest } from '../models/add-category-request.model';
import { CategoryService } from '../category.service';
import { response } from 'express';
import { error } from 'console';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-category',
  imports: [FormsModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent implements OnDestroy {
  addCategoryRequest:AddCategoryRequest;
  private addCategorySubscription?: Subscription;

  constructor(private categoryService: CategoryService, private router: Router){
    this.addCategoryRequest={
      name:'',
      urlHandle:''
    }
  }
  

  onFormSubmit(){
    console.log("Hi, I am calling...")
    console.log(this.addCategoryRequest);
   this.addCategorySubscription = this.categoryService.addCategory(this.addCategoryRequest)
    .subscribe({
      next:(response)=>{
        console.log("Category added successfully");  
        this.router.navigateByUrl('/admin/categories');

      },
      error:(err)=>console.error("Error in adding category:", err),

    });
    
  }

  ngOnDestroy(): void {
    this.addCategorySubscription?.unsubscribe();
  }
}
