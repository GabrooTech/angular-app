import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RegistrationFormService } from './registration-form.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.css'
})
export class RegistrationFormComponent implements AfterViewInit{
  @ViewChild('passwordInput') passwordInput: ElementRef;
  @ViewChild('showButton') showButton: ElementRef;
  @ViewChild('strengthContainer') strengthContainer: ElementRef; 
  isLoading = false; // loading spinner ს ვიყენებ UI ს გაუმჯობესებისთვის
  error: string = null;

  constructor(private registration_form_service: RegistrationFormService, private router: Router) {}
  // ngaftertviewinit ს ვიყინებთ რადგნა ლოგიკა დამყარებულია DOM ის ელემენტებზე ანუ რეფერენსებზე და afterinit ის მოქმედება ხდებარ როდესაც
  //  ანგულარს დასრულებული აქვს ყველანაირი დომ ელემენტის გაშინაარსება
  ngAfterViewInit(): void {
    const passwordInput = this.passwordInput.nativeElement;
    const showButton = this.showButton.nativeElement;
    const strengthContainer = this.strengthContainer.nativeElement;
    
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
    passwordInput.addEventListener('keyup', () => {
      const password = passwordInput.value;
      const strength = this.calculateStrength(password);
      this.updateStrengthIndicator(strengthContainer, strength);
    });
  }
  
  // regex ის დახმარებით ვქმნი ფუნქციას, რომელიც იუზერს ატყობინებს თუ რამდენად ძლიერი მისი კოდი
  // adjusting regex
  calculateStrength(password: string): number {
    let score = 0;
    if (password.length > 6) {
      score++;
    }
    if (/[^\w]/.test(password)) {
      score++;
    }
    if (/[0-9]/.test(password)) {
      score++;
    }
    if (/[a-z]/.test(password)) {
      score++;
    }
    if (/[A-Za-z0-9]/.test(password)) {
      score++;
    }
    return score;
  }
  // adding claslist depending on state
  updateStrengthIndicator(container: HTMLElement, strength: number): void {
    if (strength <= 2) {
      container.classList.add('weak');
      container.classList.remove('medium', 'strong');
    } else if (strength >= 2 && strength <= 4) {
      container.classList.remove('weak', 'strong');
      container.classList.add('medium');
    } else {
      container.classList.remove('weak', 'medium');
      container.classList.add('strong');
    }
  }
  on_submit(form: NgForm){
    if(!form.valid){
      return; 
      // თავს ვიზღევვთ იუზერის UI ს ჩარევის დროს რომ არ შემოგვეპაროს SUBMIT ში
    }
    const userName = form.value.username
    const email = form.value.email
    const password = form.value.password
    // firebase error handling ს ვიყენებ service ში რომ შესაბამისი error message ები გამოვიტანო
    this.isLoading = true;
    this.registration_form_service.signup(userName, email, password).subscribe(resData => {
      console.log(resData)
      this.isLoading = false;
    }, error_message => {
      console.log(error_message)
      this.error = error_message
      this.isLoading = false;
    })
    this.router.navigateByUrl('/login');
    form.reset();
  }
}
