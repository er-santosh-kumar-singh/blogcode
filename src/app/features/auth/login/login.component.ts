import { Component } from '@angular/core';
import { LoginRequest } from '../models/login-request.model';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service'
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginRequest: LoginRequest; 
  constructor(private authService: AuthService, private cookieService: CookieService, private router: Router) {
    this.loginRequest = { email: "", password: "" }
  }

  onLogin() {
    this.authService.login(this.loginRequest).subscribe({
      next: (response) => {
        console.log(response);
        // Save the token
        this.cookieService.set(
          'Authorization',
          `Bearer ${response.token}`,
          undefined,
          '/',
          undefined,
          true,
          'Strict'
        );
        // set the user
        this.authService.setUser({
          email:response.email,
          roles:response.roles
        });

        this.router.navigateByUrl('/');
      }
    })
  }
 

 
}
