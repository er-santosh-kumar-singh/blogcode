import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./core/components/navbar/navbar.component";
import { AuthService } from './features/auth/services/auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
   standalone: true, // ✅ ensure this is a standalone component
  imports: [RouterOutlet, NavbarComponent, HttpClientModule], // ✅ add HttpClientModule here
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [AuthService] // Add AuthService to providers if it's not providedIn: 'root'
})
export class AppComponent {
  title = 'blogcode';  
}
