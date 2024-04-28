import { Component, OnInit, } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-full-product',
  templateUrl: './full-product.component.html',
  styleUrl: './full-product.component.css'
})
export class FullProductComponent implements OnInit{
  productId: string;
  product: any; 
  product_brif: any;

  constructor(private route: ActivatedRoute, private data_storage: DataStorageService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productId = params['id'];
      this.fetchProductDetails(this.productId);
    });
  }

  fetchProductDetails(productId: string) {
    this.data_storage.getProductById(productId).subscribe(product => {
      this.product = product;
      console.log(product)
    });
  }

  // fetchProductBrifDetails(productId: string){
  //   this.data_storage.getProductBrif(productId).subscribe(product_brif => {
  //     this.product_brif = product_brif
  //     console.log(productId)
  //   })
  // }
}
