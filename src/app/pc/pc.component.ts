import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from '../shared/product.model';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-pc',
  templateUrl: './pc.component.html',
  styleUrls: ['./pc.component.css']
})
export class PCComponent implements OnInit, OnDestroy{
  productsWithIds: { id: string, product: Product }[] = [];
  totalProducts: number = 0;
  private productAddedSub: Subscription;

  constructor(
    private dataStorageService: DataStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchProducts();
    this.subscribeToProductAddition();
    this.fetchTotalProducts();
  }

  ngOnDestroy(): void {
    if (this.productAddedSub) {
      this.productAddedSub.unsubscribe();
    }
  }
  fetchProducts() {
    this.dataStorageService.fetch_products().subscribe(products => {
      this.productsWithIds = products;
      console.log('Fetched products:', this.productsWithIds);
    });
  }
  subscribeToProductAddition() {
    this.productAddedSub = this.dataStorageService.productAdded$.subscribe(() => {
      this.fetchProducts(); // Fetch products again when a new product is added
    });
  }
  fetchTotalProducts() {
    this.dataStorageService.fetch_products().subscribe(products => {
      this.totalProducts = products.length;
    });
  }
  checkPorduct(productId: string) {
    this.router.navigate(['/fullProduct', productId]);
  }
}