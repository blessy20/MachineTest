import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Login } from '../shared/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isSubmitted = false;
  login: Login = new Login();

  constructor(private service: AuthService, private router: Router, private toastr: ToastrService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }
  get formControls() {
    return this.loginForm.controls;
  }
  logins() {
    console.log(this.loginForm.value);
    this.isSubmitted = true;
    if (this.loginForm.invalid) {
      this.toastr.warning("Invalid credentials");
      return;
    }
    this.service.login(this.loginForm.value).subscribe(x => {
      x.forEach(element => {
       console.log(element["loginId"])
       localStorage.setItem('user',element["username"]);
       
       console.log(element["loginId"])
       if (element["loginId"] == 1) {

          this.router.navigateByUrl('/list');
        }
       else{
        this.toastr.warning("Invalid Username and Password");
       }
      });
    })
}
}
