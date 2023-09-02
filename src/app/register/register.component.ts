import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements  OnInit {
  registerForm: FormGroup;
  showAlertMessage = false;
  alertMessage = '';

  constructor(private formBuilder: FormBuilder,private userService: UserService) {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {}

  async onSubmit() {
    if (this.registerForm.valid) {
      const user = this.registerForm.value;
      try {
        await this.userService.registerUser(user).toPromise();
        this.showAlert('Registration successful! You can now login.');
      } catch (error) {
        this.showAlert('Registration failed. Please try again later.');
      }
    } else {
      this.markFormGroupAsTouched(this.registerForm);
    }
  }
  showAlert(message: string) {
    this.alertMessage = message;
    this.showAlertMessage = true;
  }
  // Mark all form controls as touched
  private markFormGroupAsTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.controls[key];
      control.markAsTouched();
    });
  }
  
}