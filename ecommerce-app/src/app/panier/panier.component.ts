import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core'; // <--- 1. Add Imports
import { CommonModule, isPlatformBrowser } from '@angular/common';     // <--- 2. Add isPlatformBrowser
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { environment } from '../../environments/environment';

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
  backendUrl = environment.apiUrl;

  constructor(
    private cartService: CartService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object // <--- 3. Inject Platform ID
  ) {}

  ngOnInit(): void {
    // <--- 4. WRAP THIS CALL. Only load cart if we are in the Browser.
    if (isPlatformBrowser(this.platformId)) {
      this.loadCart();
    } else {
      // If on server, stop loading immediately
      this.loading = false;
    }
  }

  goToBoutique() {
    this.router.navigate(['/boutique']);
  }

  loadCart() {
    this.loading = true;
    this.cartService.getCart().subscribe({
      next: (items) => {
        this.cart = items.map(item => ({ ...item, price: item.price * 10000 }));
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
