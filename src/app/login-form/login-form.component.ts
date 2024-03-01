import { Component, ElementRef, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { LoginFormService } from './login-form.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
  
})
export class LoginFormComponent implements AfterViewInit{
  form_type: string = "Login";
  @ViewChild('passwordInput') passwordInput: ElementRef;
  @ViewChild('showButton') showButton: ElementRef;
  isLoading = false; // loading spinner ს ვიყენებ UI ს გაუმჯობესებისთვის
  error: string = null;
  // ngaftertviewinit ს ვიყინებთ რადგნა ლოგიკა დამყარებულია DOM ის ელემენტებზე ანუ რეფერენსებზე და afterinit ის მოქმედება ხდებარ როდესაც
  //  ანგულარს დასრულებული აქვს ყველანაირი დომ ელემენტის გაშინაარსება

  constructor(private login_form_service: LoginFormService, private router: Router) {}


  ngAfterViewInit(): void {
    const passwordInput = this.passwordInput.nativeElement;
    const showButton = this.showButton.nativeElement;
    
    // password input field ისთვის ვქმნი hide ფუნქციას რაც საბოლოოდ მეხმრაება user ის მეერ შეყვანილი კოდის დაფარვაში
    showButton.addEventListener('click', () => {
      if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        showButton.classList.add('hide');
      } else {
        passwordInput.type = 'password';
        showButton.classList.remove('hide');
      }
    });
  }
  on_submit(form: NgForm){
    if(!form.valid){
      return; 
      // თავს ვიზღევვთ იუზერის UI ს ჩარევის დროს რომ არ შემოგვეპაროს SUBMIT ში
    }
    const email = form.value.email
    const password = form.value.password
    // firebase error handling ს ვიყენებ service ში რომ შესაბამისი error message ები გამოვიტანო
    this.isLoading = true;
    this.login_form_service.login(email, password).subscribe(resData => {
      console.log(resData)
      this.isLoading = false;
      this.router.navigate(['/home'])
    }, login_error_message => {
      console.log(login_error_message)
      this.error = login_error_message
      this.isLoading = false;
    })
    form.reset();
  }
}
