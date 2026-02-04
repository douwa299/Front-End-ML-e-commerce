import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CartService } from '../services/cart.service';
import { environment } from '../../environments/environment.development';

interface Article {
  article_id: number;
  prod_name: string;
  price: number;
  detail_desc: string;
  colour_group_name: string;
  product_type_name: string;
  product_group_name: string;
  section_name: string;
  image_path: string;
}

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  standalone: true,
  imports: [CommonModule, HttpClientModule]
})
export class ArticleComponent implements OnInit {
  article: Article | null = null;
  recommendations: Article[] = [];
  loading: boolean = true;
  error: string | null = null;

  backendUrl = environment.apiUrl ;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (!id) {
        this.error = 'No article ID provided';
        this.loading = false;
        return;
      }

      this.article = null;
      this.recommendations = [];
      this.loading = true;
      this.error = null;

      this.fetchArticle(id);
      this.fetchRecommendations(id);
    });
  }

  goToArticle(articleId: number) {
    this.router.navigate(['/article', articleId]);
  }

  fetchArticle(id: string) {
    this.http.get<Article>(`${this.backendUrl}/article/${id}`).subscribe({
      next: (res) => {
        this.article = { ...res, price: res.price * 1000 };
        this.loading = false;
      },
      error: (err) => { this.error = 'Failed to load article'; this.loading = false; }
    });
  }

  fetchRecommendations(id: string) {
    this.http.get<{ source_item: number; recommendations: Article[] }>(
      `${this.backendUrl}/recommend/${id}?top_k=9`
    ).subscribe({
      next: (res) => {
        this.recommendations = res.recommendations.map(r => ({ ...r, price: r.price * 1000 }));
      },
      error: (err) => console.error('Failed to load recommendations', err)
    });
  }

  addToCart(articleId: number) {
    if (!localStorage.getItem('token')) {
      alert("Vous devez être connecté pour ajouter au panier.");
      this.router.navigate(['/login']);
      return;
    }

    this.cartService.addToCart(articleId).subscribe({
      next: () => alert('Article ajouté au panier !'),
      error: () => alert('Impossible d\'ajouter au panier')
    });
  }
}
