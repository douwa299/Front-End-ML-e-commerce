import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface BoutiqueItem {
  article_id: number;
  prod_name: string;
  product_type_name: string;
  product_group_name: string;
  detail_desc?: string;
  colour_group_name?: string;
  section_name?: string;
  price: number;
  image_path: string;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
}

export interface RegisterPayload {
  username: string;
  password: string;
  email: string;
  sex?: string;
  birth_date?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  readonly baseUrl = '/api';
  readonly backendUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) {}

  buildImageUrl(path: string): string {
    if (!path) return '';
    return `${this.backendUrl}${path}`;
  }

  getBoutique(options?: { product_group?: string; max_price?: number; limit?: number }): Observable<BoutiqueItem[]> {
    let params = new HttpParams();
    if (options?.product_group) params = params.set('product_group', options.product_group);
    if (options?.max_price !== undefined) params = params.set('max_price', String(options.max_price));
    if (options?.limit !== undefined) params = params.set('limit', String(options.limit));
    return this.http.get<BoutiqueItem[]>(`${this.baseUrl}/boutique`, { params });
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/categories`);
  }

  getRecommendations(articleId: number, topK = 5): Observable<{ source_item: number; recommendations: BoutiqueItem[] }> {
    const params = new HttpParams().set('top_k', String(topK));
    return this.http.get<{ source_item: number; recommendations: BoutiqueItem[] }>(
      `${this.baseUrl}/recommend/${articleId}`,
      { params }
    );
  }

  login(username: string, password: string): Observable<TokenResponse> {
    const body = new HttpParams().set('username', username).set('password', password);
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.post<TokenResponse>(`${this.baseUrl}/login`, body.toString(), { headers });
  }

  register(payload: RegisterPayload): Observable<{ msg: string }> {
    return this.http.post<{ msg: string }>(`${this.baseUrl}/register`, payload);
  }

  getCart(token: string): Observable<BoutiqueItem[]> {
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.get<BoutiqueItem[]>(`${this.baseUrl}/cart`, { headers });
  }

  addToCart(articleId: number, token: string): Observable<{ msg: string }> {
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.post<{ msg: string }>(`${this.baseUrl}/cart/add/${articleId}`, {}, { headers });
  }

  removeFromCart(articleId: number, token: string): Observable<{ msg: string }> {
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.delete<{ msg: string }>(`${this.baseUrl}/cart/remove/${articleId}`, { headers });
  }
}
