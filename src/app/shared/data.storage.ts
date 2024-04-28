import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { map, tap } from "rxjs/operators";
import { Product } from '../shared/product.model';

@Injectable({providedIn: 'root'})
export class DataStorageService {
    private firebaseDatabaseUrl = 'https://angular-app-d29f3-default-rtdb.europe-west1.firebasedatabase.app/';

    private productAddedSubject = new Subject<void>();

    constructor(private http: HttpClient) {}

    productAdded$ = this.productAddedSubject.asObservable();
    // "ვდილობ" რომ და submit ებული ინფორმაცია subscribe ით ან next ით გამოვიტანო dashboard ში refresh ის გარეშე მაგრამ ჩანს რო არ გამოდის :( -- გამოვიდა უბრალოდ change არე უნდა მოხდეს კოდში start ის შემდეგ
    store_product(product: Product): Observable<any> {
        return this.http.post(`${this.firebaseDatabaseUrl}/products.json`, product).pipe(
            tap(() => {
                this.productAddedSubject.next();
            })
        );
    }
    updateProduct(productId: string, updatedFields: Partial<Product>): Observable<any> {
        return this.http.patch(`${this.firebaseDatabaseUrl}/products/${productId}.json`, updatedFields);
    }
    // fetching პროდუქტებს
    fetch_products(): Observable<{ id: string, product: Product }[]> {
        return this.http.get<{ [key: string]: Product }>(`${this.firebaseDatabaseUrl}/products.json`).pipe(
            map(responseData => {
                return Object.keys(responseData).map(key => ({ id: key, product: responseData[key] }));
            })
        );
    }
    // პროდუქტის წაშლა id ზე დაფუძნებით
    deleteProduct(productId: string): Observable<any> {
        return this.http.delete(`${this.firebaseDatabaseUrl}/products/${productId}.json`);
    }
    getProductById(productId: string): Observable<Product> {
        return this.http.get<Product>(`${this.firebaseDatabaseUrl}/products/${productId}.json`);
    }
}