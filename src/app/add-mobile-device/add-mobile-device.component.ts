import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from '../shared/product.model';
import { DataStorageService } from '../shared/data-storage.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-mobile-device',
  templateUrl: './add-mobile-device.component.html',
  styleUrl: './add-mobile-device.component.css'
})
export class AddMobileDeviceComponent {
 // ამ კომპონენტის მთავარი მიზანი არის product ის დამატების მომენტში მოვახრხო ჯერ img box ებს ui ჩარევა img ების input ით აღება და option ში html ში ვიზვალური
  // გადმოკოპირება რათა თვალსაჩინო იყოს რადგან input field ი ამის შესაძლებლობას არ გვაძლევს dragover ისა და დაჭერის ფუნქციების დამატება და საბოლოოდ
  // firebase ზე ატვირთვა
  isLoading = false;
  @ViewChild('product_price_input') product_price_input: ElementRef;
  @ViewChild('off_price_input') off_price_input: ElementRef;
  @ViewChild('product_price_input') final_price_output: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('preview') preview: ElementRef;

  @ViewChild('input_box_main') input_box_main: ElementRef;
  @ViewChild('drop_area_main') drop_area_main: ElementRef;
  @ViewChild('icon_main') icon_main: ElementRef;
  @ViewChild('text_main') text_main: ElementRef;

  @ViewChild('input_box_second') input_box_second: ElementRef;
  @ViewChild('drop_area_second') drop_area_second: ElementRef;
  @ViewChild('icon_second') icon_second: ElementRef;
  @ViewChild('text_second') text_second: ElementRef;

  @ViewChild('input_box_third') input_box_third: ElementRef;
  @ViewChild('drop_area_third') drop_area_third: ElementRef;
  @ViewChild('icon_third') icon_third: ElementRef;
  @ViewChild('text_third') text_third: ElementRef;

  @ViewChild('input_box_fourth') input_box_fourth: ElementRef;
  @ViewChild('drop_area_fourth') drop_area_fourth: ElementRef;
  @ViewChild('icon_fourth') icon_fourth: ElementRef;
  @ViewChild('text_fourth') text_fourth: ElementRef;

  @ViewChild('input_box_fifth') input_box_fifth: ElementRef;
  @ViewChild('drop_area_fifth') drop_area_fifth: ElementRef;
  @ViewChild('icon_fifth') icon_fifth: ElementRef;
  @ViewChild('text_fifth') text_fifth: ElementRef;

  final_price_outter: number;
  dominant_color: string;

  constructor(private dataStorageService: DataStorageService, private router: Router) {}

  ngAfterViewInit() {
    this.setupImageUpload(
      this.input_box_main, this.drop_area_main, this.icon_main, this.text_main
    );
    this.setupImageUpload(
      this.input_box_second, this.drop_area_second, this.icon_second, this.text_second
    );
    this.setupImageUpload(
      this.input_box_third, this.drop_area_third, this.icon_third, this.text_third
    );
    this.setupImageUpload(
      this.input_box_fourth, this.drop_area_fourth, this.icon_fourth, this.text_fourth
    );
    this.setupImageUpload(
      this.input_box_fifth, this.drop_area_fifth, this.icon_fifth, this.text_fifth
    );
    this.setupPriceCalculations(); 
    this.setupDominantColor();
  }
// dominant ი ფერის გამოთვლის დასაწყისი
  private setupDominantColor() {
    const canvasElem = this.canvas.nativeElement;
    const previewElem = this.preview.nativeElement;
    const ctx = canvasElem.getContext('2d');
    
    canvasElem.width = 1;
    canvasElem.height = 1;
    previewElem.width = 400;
    previewElem.height = 400;

    const input: HTMLInputElement = document.querySelector(".img_input");
    input.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files[0];
      const reader = new FileReader();
      
      const fileDataURL = (file: File) => new Promise<string>((resolve, reject) => {
        let fr = new FileReader();
        fr.onload = () => resolve(fr.result as string);
        fr.onerror = reject;
        fr.readAsDataURL(file);
      });

      reader.onload = (readerEvent) => {
        const image = new Image();
        image.onload = () => {
          fileDataURL(file).then((dataUrl: string) => {
            const dominantColorNow = this.getDominantColor(image, ctx);
            this.dominant_color = dominantColorNow;
            console.log('Dominant Color:', dominantColorNow);
          });
        }
        image.src = readerEvent.target.result as string;
      }
      reader.readAsDataURL(file);
    }
  }

  private getDominantColor(imageObject: HTMLImageElement, ctx: CanvasRenderingContext2D): string {
    ctx.drawImage(imageObject, 0, 0, 1, 1);
    const i = ctx.getImageData(0, 0, 1, 1).data;
    return "#" + ((1 << 24) + (i[0] << 16) + (i[1] << 8) + i[2]).toString(16).slice(1);
  }
// dominant ი ფერის გამოთვლის დასასრული
  private setupPriceCalculations() {
    this.product_price_input.nativeElement.addEventListener('input', this.calculateFinalPrice.bind(this));
    this.off_price_input.nativeElement.addEventListener('input', this.calculateFinalPrice.bind(this));
  }
  private calculateFinalPrice() { // ვითვლი ფინალურ ფასს ფასდაკლების არსებობის შემთხვევაში 
    const product_price = parseFloat(this.product_price_input.nativeElement.value);
    const off_price = parseFloat(this.off_price_input.nativeElement.value);

    let final_price = product_price - (product_price * off_price / 100);
    final_price = isNaN(final_price) ? 0 : final_price;

    this.final_price_output.nativeElement.textContent = final_price.toFixed(2);
    console.log(final_price)
    this.final_price_outter = final_price
    console.log(this.final_price_outter)
  }
  private setupImageUpload(input_box: ElementRef, drop_area: ElementRef, icon: ElementRef, text: ElementRef) {
    input_box.nativeElement.addEventListener("change", () => {
      this.handleImageUpload(input_box, drop_area, icon, text);
    });

    drop_area.nativeElement.addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    drop_area.nativeElement.addEventListener("drop", (e) => {
      e.preventDefault();
      input_box.nativeElement.files = e.dataTransfer.files;
      this.handleImageUpload(input_box, drop_area, icon, text);
    });

    drop_area.nativeElement.addEventListener("click", () => {
      input_box.nativeElement.click();
    });
  }

  private handleImageUpload(input_box: ElementRef, drop_area: ElementRef, icon: ElementRef, text: ElementRef) {
    let imgLink = URL.createObjectURL(input_box.nativeElement.files[0]);
    drop_area.nativeElement.style.backgroundImage = `url(${imgLink})`;
    drop_area.nativeElement.setAttribute('value', imgLink);
    drop_area.nativeElement.textContent = "";

    if (icon && text) {
      icon.nativeElement.remove();
      text.nativeElement.remove();
    }
  }

  on_add_item(form: NgForm){
    if(form.invalid){
      return
    }
    const value = form.value;
    const newProduct = new Product(
      value.product_name,
      value.link_word,
      value.product_price,
      value.off_price,
      value.product_description,
      value.final_price,
      value.dominant_color,
      'MD',
      value.main_photo,
      value.second_img,
      value.third_img,
      value.fourth_img,
      value.fifth_img
    );
    this.isLoading = true;
    this.dataStorageService.store_product(newProduct)
      .subscribe(response => {
        console.log('Product stored successfully:', response);
        this.isLoading = false;
        this.router.navigate(['/dashboard'])
      }, error => {
        console.log(this.dataStorageService)
        console.log(this.dataStorageService)
        this.isLoading = false;
      });
  }
}
