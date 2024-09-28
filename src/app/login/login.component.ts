import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BackendService } from '../services/backend.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  isSubmitActive: boolean = true;

  constructor(
    private fb: FormBuilder,
    private backend: BackendService,
    private router: Router
  ) {
    this.form = this.fb.group({
      phone: [
        '',
        [Validators.required, Validators.pattern('[- +()0-9]{10,12}')],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  ngOnInit(): void {
    const isLoggedIn = !!localStorage.getItem('userData');
    if (isLoggedIn) {
      this.router.navigate(['/menu']);
    }
  }

  submit() {
    this.isSubmitActive = false;
    this.backend.addDataJson('user/login', this.form.value).subscribe({
      next: res => {
        localStorage.setItem('userData', JSON.stringify(res));
        this.router.navigate(['/menu']);
      },
      error: err => {
        this.isSubmitActive = true;
      },
    });
  }
}
