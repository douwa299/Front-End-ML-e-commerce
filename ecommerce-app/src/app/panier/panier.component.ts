import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class PanierComponent implements OnInit {
  cart: any[] = [];
  loading = true;
  error: string | null = null;

  constructor(private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }
  goToBoutique() {
    this.router.navigate(['/boutique']);
  }

  loadCart() {
    this.loading = true;
    this.cartService.getCart().subscribe({
      next: (items) => {
        this.cart = items.map(item => ({ ...item, price: item.price * 1000}));
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load cart';
        this.loading = false;
      }
    });
  }

  removeItem(article_id: number) {
    this.cartService.removeFromCart(article_id).subscribe({
      next: () => this.loadCart(),
      error: () => alert('Failed to remove item')
    });
  }

  get subtotal(): number {
    return this.cart.reduce((acc, item) => acc + (item.price || 0), 0);
  }

  get total(): number {
    return this.subtotal; 
  }
}
