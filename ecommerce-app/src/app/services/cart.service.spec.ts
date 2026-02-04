import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common'; // <--- IMPORTS ARE IMPORTANT
import { environment } from '../../environments/environment';

export interface CartItem {
  article_id: number;
  prod_name: string;
  product_type_name: string;
  detail_desc: string;
  colour_group_name: string;
  price: number;
  image_path: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  backendUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object // <--- INJECT PLATFORM ID
  ) {}

  private getAuthHeaders() {
    let token = '';

    // <--- THIS IF STATEMENT PREVENTS THE CRASH
    if (isPlatformBrowser(this.platformId)) {
      token = localStorage.getItem('token') || '';
    }

    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getCart(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.backendUrl}/cart`, { headers: this.getAuthHeaders() });
  }

  addToCart(article_id: number): Observable<any> {
    return this.http.post(`${this.backendUrl}/cart/add/${article_id}`, {}, { headers: this.getAuthHeaders() });
  }

  removeFromCart(article_id: number): Observable<any> {
    return this.http.delete(`${this.backendUrl}/cart/remove/${article_id}`, { headers: this.getAuthHeaders() });
  }
}
