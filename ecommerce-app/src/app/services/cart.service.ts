import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  backendUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) {}

  private getAuthHeaders() {
    const token = localStorage.getItem('token') || '';
    console.log(token,new HttpHeaders({
      'Authorization': `Bearer ${token}`
    }));
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getCart(): Observable<CartItem[]> {
        console.log(this.http.get<CartItem[]>(`${this.backendUrl}/cart`, { headers: this.getAuthHeaders() }));

    return this.http.get<CartItem[]>(`${this.backendUrl}/cart`, { headers: this.getAuthHeaders() });
  }

  addToCart(article_id: number): Observable<any> {
    console.log(this.http.post(`${this.backendUrl}/cart/add/${article_id}`, {}, { headers: this.getAuthHeaders() }));
    return this.http.post(`${this.backendUrl}/cart/add/${article_id}`, {}, { headers: this.getAuthHeaders() });
  }

  removeFromCart(article_id: number): Observable<any> {
    return this.http.delete(`${this.backendUrl}/cart/remove/${article_id}`, { headers: this.getAuthHeaders() });
  }
}
