import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../category.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Category } from '../models/category.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-category',
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css'
})
export class EditCategoryComponent implements OnInit, OnDestroy {
  id: string | null = null;
  paramSubscription?: Subscription;
  category?: Category;

  constructor(private router: Router, private route: ActivatedRoute,
    private categoryService: CategoryService) {

  }

  ngOnInit(): void {
    this.paramSubscription = this.route.paramMap.subscribe({
      next: (param) => {
        this.id = param.get('id');
        if (this.id) {
          this.categoryService.getCategoryById(this.id).subscribe({
            next: (response) => {
              console.log(response);
              this.category = response;
            },
            error: (err) => console.log('Error occuring: ', err),

          });
        }
        else {
          console.log('No id found');
        }
      }

    });
  }

  onFormSubmit(): void {
    console.log(this.category);
    const updateCategoryRequest = {
      name: this.category?.name ?? '',
      urlHandle: this.category?.urlHandle ?? '',
    };
  if(this.id){
    this.categoryService.updateCategory(this.id, updateCategoryRequest).subscribe({
      next:(response)=>{
        this.router.navigateByUrl('/admin/categories');
      }

    });
  }

  };



  ngOnDestroy(): void {
    this.paramSubscription?.unsubscribe();
  }


}
