import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { DataStorageService } from '../shared/data-storage.service';
import { Product } from '../shared/product.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


// ფორმა ააბდეითებს სრულიად პროდუქტს მაგრამ არ ვეხები ფოტოების განყოფილებებს რადგან მათი მოდფიკაცია back ის არ ქონის გამო შეუძლებელია
@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  productId: string;
  product: Product;

  constructor(
    private route: ActivatedRoute,
    private dataStorageService: DataStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params: Params) => {
        this.productId = params['id'];
        return this.dataStorageService.getProductById(this.productId);
      })
    ).subscribe(product => {
      this.product = product;
    });
  }

  on_add_item(form: NgForm){
    const value = form.value;
    const updatedFields = {
      product_name: value.product_name,
      link_word: value.link_word,
      product_price: value.product_price,
      off_price: value.off_price,
      product_description: value.product_description,
      final_price: value.final_price,
      dominant_color: value.dominant_color,
      type: value.type
      // იმის გამო რომ ვერ ვახერხებ ფოტოებზე წვდლომას იძუელბული გავხვდი რომ ფოტოები მოდულში გამეხადა optional ამიტომ მათში ცვლიელბს ვერ შევიტან
    };
    this.dataStorageService.updateProduct(this.productId, updatedFields)
    .subscribe({
      next: (response) => {
        console.log('Product updated successfully:', response);
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('Error updating product:', error);
      }
    });
  }
  }
  

