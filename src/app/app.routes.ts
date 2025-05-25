import { Routes } from '@angular/router';
import { CategoryListComponent } from './features/category/category-list/category-list.component';
import { HomeComponent } from './features/public/home/home.component';
import { AddCategoryComponent } from './features/category/add-category/add-category.component';
import { EditCategoryComponent } from './features/category/edit-category/edit-category.component';
import { AddBlogComponent } from './features/blog-post/add-blog/add-blog.component';
import { BlogpostListComponent } from './features/blog-post/blogpost-list/blogpost-list.component';
import { EditBlogpostComponent } from './features/blog-post/edit-blogpost/edit-blogpost.component';
import { LoginComponent } from './features/auth/login/login.component';
import { authGuard } from './features/auth/authGuard/auth.guard';

export const routes: Routes =
    [
        { path: '', component: HomeComponent },
        { path: 'admin/categories', component: CategoryListComponent,  canActivate: [authGuard]},
        { path: 'admin/categories/add', component: AddCategoryComponent, canActivate: [authGuard]  },
        { path: 'admin/categories/:id', component: EditCategoryComponent, canActivate: [authGuard] },
        { path: 'admin/blogposts', component: BlogpostListComponent  },
        { path: 'admin/blogposts/add', component: AddBlogComponent,canActivate: [authGuard]  },
        { path: 'admin/blogposts/edit/:id', component: EditBlogpostComponent,canActivate: [authGuard]  },
        { path: 'login', component: LoginComponent }
    ];
