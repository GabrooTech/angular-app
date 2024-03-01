import { Component, OnInit } from '@angular/core';
import { LoginFormService } from './login-form/login-form.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'angular-app';
  constructor(private login_form_service: LoginFormService) {}
  ngOnInit(): void {
    this.login_form_service.auto_login()
  }
}
