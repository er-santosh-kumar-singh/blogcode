import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { LoginResponse } from '../models/login-response.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginRequest } from '../models/login-request.model';
import { environment } from '../../../environments/environment.development';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$= new BehaviorSubject<User| undefined>(undefined);
   constructor(private _http: HttpClient, private cookieService:CookieService ) { }

  
  login(model: LoginRequest):Observable<LoginResponse>{
    return this._http.post<LoginResponse>(`${environment.apiBaseUrl}auth/login`,model);

  }

  setUser(user: User):void{
  this.user$.next(user);
  localStorage.setItem('user-email', user.email);
  localStorage.setItem('user-roles', user.roles.join(','));
  }

  user():Observable<User |undefined>{
    return this.user$.asObservable();
  }

  getUser():User |undefined{
    const email= localStorage.getItem('user-email');
    const roles = localStorage.getItem('user-roles');
    if(email && roles){
      const user: User ={email:email,roles:roles.split(',')};
      return user;
    }
    return undefined;
  }

  logout():void{
    localStorage.clear();
    this.cookieService.delete('Authorization','/');
    this.user$.next(undefined);
  }
}
