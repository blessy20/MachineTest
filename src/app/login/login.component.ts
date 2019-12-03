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

    if (this.loginForm.invalid) {
      this.toastr.warning("Enter Username and Password");
      return;
    }
    this.isSubmitted = true;
    this.service.login(this.loginForm.value).subscribe(element => {
       
      if(element!=null)
      {
        if (element["usertype"] == 'Admin') {
          localStorage.setItem('ACCESS_TOKEN', element["username"]);
          this.router.navigateByUrl('/admin');
          this.toastr.success('Welcome Admin','Asset Management System');
        }
        else if (element["usertype"] == 'PurchaseManager') {
          localStorage.setItem('ACCESS_TOKEN', element["username"]);
          this.toastr.success("Welcome Purchase Manager");
          this.router.navigateByUrl('/purchase');

        }
      }
      else{
        this.toastr.error("Invalid username and password");
      }
     
      });
    
  }
}


