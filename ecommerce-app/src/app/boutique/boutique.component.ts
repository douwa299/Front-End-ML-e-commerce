import { Component, OnInit } from '@angular/core';

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
  sortBy: string = 'newest';

  ngOnInit() {
    // TODO: Appel API au backend FastAPI
    // this.fetchProducts();
  }

  // Cette méthode sera appelée avec les données du backend
  setProducts(data: Product[]) {
    this.products = data;
    this.filteredProducts = [...this.products];
    this.sortProducts();
  }

  sortProducts() {
    switch (this.sortBy) {
      case 'newest':
        this.filteredProducts = [...this.products];
        break;
      case 'priceLow':
        this.filteredProducts = [...this.products].sort((a, b) => a.price - b.price);
        break;
      case 'priceHigh':
        this.filteredProducts = [...this.products].sort((a, b) => b.price - a.price);
        break;
      case 'alphabetical':
        this.filteredProducts = [...this.products].sort((a, b) => a.name.localeCompare(b.name));
        break;
    }
  }

  onSortChange() {
    this.sortProducts();
  }
}
