import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private max_width: number;
  @ViewChild('boxRef') boxRef!: ElementRef;
  @ViewChild('trendingBoxRef') trendingBoxRef!: ElementRef;
  @ViewChild('brandRef') brandRef!: ElementRef;
  is_loading = false;
  // ზუსტად ვწერ ყველა მოქმედებას გადასვლისას რომ ყველა დივაისზე გაცენტრდეს
  locator: string[] = ["0px", "-280px", "-630px", "-985px", "-1335px", "-1685px", "-2040px"];
  counter = 0;
  my_timer!: ReturnType<typeof setInterval>;

  locator_reverse: string[] = ["2040px", "1685px", "1335px", "985px", "630px", "280px", "0px"];
  counter_reverse = 0;
  my_timer_reverse!: ReturnType<typeof setInterval>;

  brand_locator: string[] = ["0px", "-250px", "-600px", "-865px", "-1205px", "-1455px"];
  brand_counter = 0;
  brand_timer!: ReturnType<typeof setInterval>;

  constructor() {
    // ინიციალიზაციას ვუკეთებ მაქსიმუმ სიგანეს მობაილ და სვა დევაისებისთვის
    this.max_width = Math.max(
      document.body.scrollWidth,
      document.documentElement.scrollWidth,
      document.body.offsetWidth,
      document.documentElement.offsetWidth,
      document.documentElement.clientWidth
    );
  }

  ngOnInit(): void {
    this.my_timer = setInterval(() => this.changer(), 5000);
    this.my_timer_reverse = setInterval(() => this.changer_reverse(), 5000);
    this.brand_timer = setInterval(() => this.brand_changer(), 3000);
  }

  ngOnDestroy(): void {
    clearInterval(this.my_timer);
    clearInterval(this.my_timer_reverse);
    clearInterval(this.brand_timer);
  }
// ავტომატურად ვამოძრავებ სქეციებს 
  changer(): void {
    this.counter = (this.counter < 6) ? this.counter + 1 : 0;
    this.boxRef.nativeElement.style.transform = `translateX(${this.locator[this.counter]})`;
  }

  changer_reverse(): void {
    this.counter_reverse = (this.counter_reverse > 0) ? this.counter_reverse - 1 : 6;
    this.trendingBoxRef.nativeElement.style.transform = `translateX(${this.locator_reverse[this.counter_reverse]})`;
  }

  brand_changer(): void {
    this.brand_counter = (this.brand_counter < 5) ? this.brand_counter + 1 : 0;
    this.brandRef.nativeElement.style.transform = `translateX(${this.brand_locator[this.brand_counter]})`;
  }
// აქიდან უკვე ვიწყებ მათ ამოძრავეს ღილაკებით
  handle_sale_next(): void {
    if (this.max_width > 1750) {
        this.counter = (this.counter < 6) ? this.counter + 1 : 0;
        this.boxRef.nativeElement.style.transform = `translateX(${this.locator[this.counter]})`;
    } else if (this.max_width <= 1750 && this.max_width > 1520) {
        this.counter = (this.counter < 7) ? this.counter + 1 : 0;
        this.boxRef.nativeElement.style.transform = `translateX(${this.locator[this.counter]})`;
    } else if (this.max_width <= 1520 && this.max_width > 1080) {
        this.counter = (this.counter < 8) ? this.counter + 1 : 0;
        this.boxRef.nativeElement.style.transform = `translateX(${this.locator[this.counter]})`;
    } else if (this.max_width <= 1080 && this.max_width > 750) {
        this.counter = (this.counter < 8) ? this.counter + 1 : 0;
        this.boxRef.nativeElement.style.transform = `translateX(${this.locator[this.counter]})`;
    } else if (this.max_width <= 750 && this.max_width > 530) {
        this.counter = (this.counter < 9) ? this.counter + 1 : 0;
        this.boxRef.nativeElement.style.transform = `translateX(${this.locator[this.counter]})`;
    } else if (this.max_width <= 530) {
        this.counter = (this.counter < 9) ? this.counter + 1 : 0;
        this.boxRef.nativeElement.style.transform = `translateX(${this.locator[this.counter]})`;
    }
}

handle_sale_back(): void {
    if (this.max_width > 1750) {
        this.counter = (this.counter > 0) ? this.counter - 1 : 6;
        this.boxRef.nativeElement.style.transform = `translateX(${this.locator[this.counter]})`;
    } else if (this.max_width <= 1750 && this.max_width > 1520) {
        this.counter = (this.counter > 0) ? this.counter - 1 : 6;
        this.boxRef.nativeElement.style.transform = `translateX(${this.locator[this.counter]})`;
    } else if (this.max_width <= 1520 && this.max_width > 1080) {
        this.counter = (this.counter > 0) ? this.counter - 1 : 7;
        this.boxRef.nativeElement.style.transform = `translateX(${this.locator[this.counter]})`;
    } else if (this.max_width <= 1080 && this.max_width > 750) {
        this.counter = (this.counter > 0) ? this.counter - 1 : 7;
        this.boxRef.nativeElement.style.transform = `translateX(${this.locator[this.counter]})`;
    } else if (this.max_width <= 750 && this.max_width > 530) {
        this.counter = (this.counter > 0) ? this.counter - 1 : 8;
        this.boxRef.nativeElement.style.transform = `translateX(${this.locator[this.counter]})`;
    } else if (this.max_width <= 530) {
        this.counter = (this.counter > 0) ? this.counter - 1 : 8;
        this.boxRef.nativeElement.style.transform = `translateX(${this.locator[this.counter]})`;
    }
}

  handle_trending_next(): void {
    if (this.max_width > 1750) {
        this.counter_reverse = (this.counter_reverse < 6) ? this.counter_reverse + 1 : 0;
        this.trendingBoxRef.nativeElement.style.transform = `translateX(${this.locator_reverse[this.counter_reverse]})`;
    } else if (this.max_width <= 1750 && this.max_width > 1520) {
        this.counter_reverse = (this.counter_reverse < 6) ? this.counter_reverse + 1 : 0;
        this.trendingBoxRef.nativeElement.style.transform = `translateX(${this.locator_reverse[this.counter_reverse]})`;
    } else if (this.max_width <= 1520 && this.max_width > 1080) {
        this.counter_reverse = (this.counter_reverse < 7) ? this.counter_reverse + 1 : 0;
        this.trendingBoxRef.nativeElement.style.transform = `translateX(${this.locator_reverse[this.counter_reverse]})`;
    } else if (this.max_width <= 1080 && this.max_width > 750) {
        this.counter_reverse = (this.counter_reverse < 8) ? this.counter_reverse + 1 : 0;
        this.trendingBoxRef.nativeElement.style.transform = `translateX(${this.locator_reverse[this.counter_reverse]})`;
    } else if (this.max_width <= 750 && this.max_width > 530) {
        this.counter_reverse = (this.counter_reverse < 8) ? this.counter_reverse + 1 : 0;
        this.trendingBoxRef.nativeElement.style.transform = `translateX(${this.locator_reverse[this.counter_reverse]})`;
    } else if (this.max_width <= 530) {
        this.counter_reverse = (this.counter_reverse < 8) ? this.counter_reverse + 1 : 0;
        this.trendingBoxRef.nativeElement.style.transform = `translateX(${this.locator_reverse[this.counter_reverse]})`;
    }
  }

  handle_trending_back(): void {
    if (this.max_width > 1750) {
        this.counter_reverse = (this.counter_reverse > 0) ? this.counter_reverse - 1 : 6;
        this.trendingBoxRef.nativeElement.style.transform = `translateX(${this.locator_reverse[this.counter_reverse]})`;
    } else if (this.max_width <= 1750 && this.max_width > 1520) {
        this.counter_reverse = (this.counter_reverse > 0) ? this.counter_reverse - 1 : 6;
        this.trendingBoxRef.nativeElement.style.transform = `translateX(${this.locator_reverse[this.counter_reverse]})`;
    } else if (this.max_width <= 1520 && this.max_width > 1080) {
        this.counter_reverse = (this.counter_reverse > 0) ? this.counter_reverse - 1 : 7;
        this.trendingBoxRef.nativeElement.style.transform = `translateX(${this.locator_reverse[this.counter_reverse]})`;
    } else if (this.max_width <= 1080 && this.max_width > 750) {
        this.counter_reverse = (this.counter_reverse > 0) ? this.counter_reverse - 1 : 8;
        this.trendingBoxRef.nativeElement.style.transform = `translateX(${this.locator_reverse[this.counter_reverse]})`;
    } else if (this.max_width <= 750 && this.max_width > 530) {
        this.counter_reverse = (this.counter_reverse > 0) ? this.counter_reverse - 1 : 8;
        this.trendingBoxRef.nativeElement.style.transform = `translateX(${this.locator_reverse[this.counter_reverse]})`;
    } else if (this.max_width <= 530) {
        this.counter_reverse = (this.counter_reverse > 0) ? this.counter_reverse - 1 : 8;
        this.trendingBoxRef.nativeElement.style.transform = `translateX(${this.locator_reverse[this.counter_reverse]})`;
    }
  }

handle_brand_next(): void {
    this.brand_counter = (this.brand_counter < 5) ? this.brand_counter + 1 : 0;
    this.brandRef.nativeElement.style.transform = `translateX(${this.brand_locator[this.brand_counter]})`;
}

handle_brand_back(): void {
    this.brand_counter = (this.brand_counter > 0) ? this.brand_counter - 1 : 5;
    this.brandRef.nativeElement.style.transform = `translateX(${this.brand_locator[this.brand_counter]})`;
}
}