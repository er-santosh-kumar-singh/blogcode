import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../../features/auth/models/user.model';
import { AuthService } from '../../../features/auth/services/auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule, HttpClientModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  user: User | undefined;

  constructor(private router: Router, private authService: AuthService) { }


  ngOnInit(): void {
    this.authService.user().subscribe({
      next: (userResponse) => {
        this.user = userResponse;
        console.log('User', this.user);
      },
    });
    this.user = this.authService.getUser();
  }
  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }

}
