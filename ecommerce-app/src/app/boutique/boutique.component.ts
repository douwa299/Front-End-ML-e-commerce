import { Component, OnInit } from '@angular/core';
import { ApiService, BoutiqueItem } from '../services/api.service';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

@Component({
  selector: 'app-boutique',
  standalone: false,
  templateUrl: './boutique.component.html',
  styleUrl: './boutique.component.css'
})
export class BoutiqueComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: string[] = [];
  selectedCategory: string = 'all';
  isLoading = false;
  errorMessage = '';

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadCategories();
    this.fetchProducts();
  }

  loadCategories() {
    this.api.getCategories().subscribe({
      next: (cats: string[]) => {
        this.categories = cats;
      },
      error: () => {
        console.error('Impossible de charger les catégories');
      }
    });
  }

fetchProducts() {
  this.isLoading = true;

  // 1. Prepare query params (similar to your HTML fetch)
  const params: any = { limit: 100 };
  if (this.selectedCategory !== 'all' && this.selectedCategory !== 'All') {
    params.product_group = this.selectedCategory;
  }

  // 2. Pass these params to your API service
  this.api.getBoutique(params).subscribe({
    next: (items: BoutiqueItem[]) => {
      this.products = items.map((item) => ({
        id: item.article_id,
        name: item.prod_name,
        price: item.price * 10000,
        image: this.api.buildImageUrl(item.image_path),
        category: item.product_group_name
      }));

      // Now filteredProducts is just the full result from the API
      this.filteredProducts = [...this.products];
      this.isLoading = false;
    },
    error: () => {
      this.isLoading = false;
      this.errorMessage = 'Erreur de chargement.';
    }
  });
}

  filterByCategory() {
    if (this.selectedCategory === 'all') {
      this.filteredProducts = [...this.products];
    } else {
      this.filteredProducts = this.products.filter(
        (p) => p.category === this.selectedCategory
      );
    }
  }

  onCategoryChange() {
    this.filterByCategory();
  }

  selectProduct(product: Product) {
    localStorage.setItem('selectedProduct', JSON.stringify(product));
  }
}
