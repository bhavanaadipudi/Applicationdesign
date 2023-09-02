import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup;
  isSubmitted = false;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {}

  onSubmit() {
    this.isSubmitted = true;
    if (this.loginForm.valid) {
      // Simulate login logic (replace with actual authentication)
      const username = this.loginForm.value.username;
      const password = this.loginForm.value.password;

      // For demonstration purposes, assume valid credentials
      if (username === 'bhavana' && password ==='123456') {
        // Navigate to the products page
        this.router.navigate(['/products']);
      } else {
        // Handle invalid login
        console.log('Invalid login credentials');
      }
    }
  }
  
}
