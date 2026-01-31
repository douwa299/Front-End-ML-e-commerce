import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';
  confirm = '';
  sex = 'Unknown';
  birthDate = '';
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(private api: ApiService, private router: Router) {}

  onSubmit() {
    this.errorMessage = '';
    this.successMessage = '';
    this.username = this.username.trim();
    this.email = this.email.trim();
    if (!this.username || !this.email) {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires.';
      return;
    }
    if (this.password !== this.confirm) {
      this.errorMessage = 'Les mots de passe ne correspondent pas.';
      return;
    }
    if (this.password.length > 72) {
      this.errorMessage = 'Le mot de passe ne peut pas dépasser 72 caractères.';
      return;
    }
    this.isLoading = true;
    const payload = {
      username: this.username,
      email: this.email,
      password: this.password,
      sex: this.sex,
      birth_date: this.birthDate || undefined
    };
    console.log('Sending registration payload:', payload);
    this.api.register(payload).subscribe({
      next: () => {
        this.isLoading = false;
        this.successMessage = 'Compte créé. Vous pouvez vous connecter.';
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.isLoading = false;
        const formattedError = this.formatError(err);
        this.errorMessage = formattedError || 'Inscription échouée. Réessayez.';
        console.error('Registration error:', err);
        console.error('Formatted message:', this.errorMessage);
      }
    });
  }

  private formatError(err: any): string {
    const detail = err?.error?.detail;
    if (!detail) return '';
    if (typeof detail === 'string') return detail;
    if (Array.isArray(detail) && detail.length > 0) {
      const msg = detail[0]?.msg || detail[0]?.message;
      return msg || JSON.stringify(detail[0]);
    }
    return '';
  }
}
