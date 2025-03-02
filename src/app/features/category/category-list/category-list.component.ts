import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from 'express';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-category-list',
  standalone:true,
  imports: [RouterModule, CommonModule, FormsModule,HttpClientModule],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent implements OnInit{
categories$? : Observable<Category[]>;

constructor(private categoryService: CategoryService){}
  ngOnInit(): void {
   this.categories$ = this.categoryService.getAllCategories();
  }

}
