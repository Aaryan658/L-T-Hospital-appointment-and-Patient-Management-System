import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule
  ],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  loginObj = {
    email: '',
    password: '',
    role: 'patient' as 'patient' | 'doctor',
    patientId: '',
    doctorId: ''
  };

  hidePassword = true;

  constructor(private authService: AuthService) { }

  onLogin() {
    if (this.loginObj.email && this.loginObj.password) {
      // Strict Demo Validation
      const emailDomain = '@medisync.com';
      if (!this.loginObj.email.endsWith(emailDomain)) {
        alert(`Access Denied: Please use a valid demo email ending in ${emailDomain}`);
        return;
      }

      if (this.loginObj.role === 'patient' && this.loginObj.password !== 'patientPass123') {
        alert('Access Denied: Invalid demo password for Patient. See README.');
        return;
      }

      if (this.loginObj.role === 'doctor' && this.loginObj.password !== 'doctorPass123') {
        alert('Access Denied: Invalid demo password for Doctor. See README.');
        return;
      }

      // Parse ID safely
      const rawId = this.loginObj.role === 'patient' ? this.loginObj.patientId : this.loginObj.doctorId;

      // Basic check against mock data constraints (1-4 for doctors, 1-3 for patients) usually
      // For Demo, we allow login but maybe warn if ID is weird? 
      // Actually strictly speaking we should just pass it.

      this.authService.login(this.loginObj.role, rawId);
    } else {
      alert('Please enter email and password');
    }
  }
}
