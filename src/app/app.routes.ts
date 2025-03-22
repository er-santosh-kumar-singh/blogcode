import { Routes } from '@angular/router';
import { CategoryListComponent } from './features/category/category-list/category-list.component';
import { HomeComponent } from './features/public/home/home.component';
import { AddCategoryComponent } from './features/category/add-category/add-category.component';
import { EditCategoryComponent } from './features/category/edit-category/edit-category.component';

export const routes: Routes =
    [
        { path: '', component: HomeComponent },
        { path: 'admin/categories', component: CategoryListComponent },
        {path:'admin/categories/add', component: AddCategoryComponent},
        {path:'admin/categories/:id', component:EditCategoryComponent}
    ];
