import { Component, ElementRef, ViewChild, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { LoginFormService } from '../login-form/login-form.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent implements AfterViewInit, OnInit, OnDestroy{
  is_authetificated = false // user login state
  is_admin = false; // admin state
  private user_sub: Subscription
  fa_bars = faBars;
  @ViewChild('btn') btn: ElementRef;
  @ViewChild('sidebar') sidebar: ElementRef;
  @ViewChild('spdr') spdr: ElementRef;
  // თუ login ს ან რეგისტრაციის route ზე ვართ aside bar ს ვა disable ბ
  disableIcons: boolean = false;

  constructor(private router: Router, private login_form_service: LoginFormService) {}
  // ngaftertviewinit ს ვიყინებთ რადგნა ლოგიკა დამყარებულია DOM ის ელემენტებზე ანუ რეფერენსებზე და afterinit ის მოქმედება ხდებარ როდესაც
  //  ანგულარს დასრულებული აქვს ყველანაირი დომ ელემენტის გაშინაარსება
  // ვამოწმებს ეკრაინს ზომას რომ გადავიყვანო პც დან პლანშეტი + მობილურის დიზაინში
  ngOnInit(): void {
    this.user_sub = this.login_form_service.user$.subscribe(user => {
      this.is_authetificated = !!user;
      // რადგან backend თან ამ შემთხვევაში არ მაქ უხეშად დაცულობის გარეშე იძულებული ვარ რომ იუზერს რომელიც ამ id ს შეესაბამება მივცე is_admin როლი 
      // id ყველა user ის თვის განხვავებულია თუმცა ამ შემთხვევაში გადავწვყვიტე, რომ ერთერთი ყოფილიყო ჩემი "admin" ამას ui ში გამოვიყენებ იმისთვის, რომ უფლება მივცე 
      // admin ს გამოიყენოს dashboard ი
      if (user && user.id === "1URGlX6vqWZepr9c4MLQwPi68Qx1") {
        this.is_admin = true;
      } else {
        this.is_admin = false;
      }
    });

    // console.log(this.is_authetificated); იმისათვის რომ is_autentificated გარედან ხელ 
    // მისაწვდომი იყოს დავამატე user$ და login-form-component ში როდესაც ვიყენებდი new Subject<user> ს შევცვალე  new BehaviorSubject<User>(null) ით
    // ანუ observable გავხადე exposed შემეძლო ამისგან თავი ამერიდებინა, რომ login და რეგისტრაციის form ები როგორც component ები და service ები გამეერთიანებინა მაგრამ
    // თავიდანვე როგორც დავიწყე იმ ზას მივყვები
  }
  ngAfterViewInit(): void {
    if (typeof window !== 'undefined'){
      const x = window.matchMedia("(max-width: 1000px)");
      this.toogler(x); // Call the function initially
      x.addEventListener('change', (e) => {
        this.toogler(e.matches);
      });
      // თაიმაუთს ვუყენებ რადგან disabling ს მანამდე ვაკეთებ სამან კოდი გააშინაარსებს რაც error ს გვაძლევს ამიტომ მცირე დროს ვაზლევ გასარკვევად
      setTimeout(() => {
        this.checkRoutingPath();
      });
    }
  }
  on_log_out(){
    this.login_form_service.logout();
  }
  ngOnDestroy(): void {
    this.user_sub.unsubscribe() // unsub user prop ისთვის memory leak რომ არ მოხდეს
  }
  // მობილურის ვერსიაში ვამატებ ბარს იუზერმა რომ შეძლეს aside ის კომფორტული გამოყენება
  toogler(x: MediaQueryList | boolean): void {
    if (typeof window !== 'undefined'){
      const btn = this.btn.nativeElement;
      const sidebar = this.sidebar.nativeElement;
      const spdr = this.spdr.nativeElement;
      if (typeof x === 'boolean') {
        if (x) {
          btn.onclick = () => {
            sidebar.classList.toggle("active");
            spdr.classList.toggle("slider_active");
          };
          spdr.onclick = () => {
            sidebar.classList.toggle("active");
            spdr.classList.toggle("slider_active");
            // console.log("clicked");
          };
        } else {
          btn.onclick = null;
          spdr.onclick = null;
        }
      } else {
        if (x.matches) {
          btn.onclick = () => {
            sidebar.classList.toggle("active");
            spdr.classList.toggle("slider_active");
          };
          spdr.onclick = () => {
            sidebar.classList.toggle("active");
            spdr.classList.toggle("slider_active");
            // console.log("clicked");
          };
        } else {
          btn.onclick = null;
          spdr.onclick = null;
        }
      }
    }
  }
  // ვამოწმებ routing ებს და ამის მიხედვით ვმოქმდებ aside ზე
  checkRoutingPath(): void {
    const currentUrl = this.router.url;
    // console.log('current url:', currentUrl);
    if (currentUrl.includes('/registration') || currentUrl.includes('/login')) {
      this.disableIcons = true;
      // console.log('icons disabled');
    } else {
      this.disableIcons = false;
      // console.log('icons enabled');
    }
  }
}
