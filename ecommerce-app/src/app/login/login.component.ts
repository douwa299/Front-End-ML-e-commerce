import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = '';
  password = '';
  isLoading = false;
  errorMessage = '';

  constructor(private api: ApiService, private router: Router) {}

  onSubmit() {
    this.isLoading = true;
    this.errorMessage = '';
    console.log('Login attempt with:', { username: this.username, password: this.password });
    this.api.login(this.username, this.password).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.access_token);
        this.isLoading = false;
        this.router.navigate(['/products']);
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Login error:', err);
        this.errorMessage = 'Identifiants invalides. Réessayez.';
      }
    });
  }
}
