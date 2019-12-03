import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { LocationStrategy } from '@angular/common';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit {

  constructor(private authservice:AuthService,private router:Router,private locationStrategy: LocationStrategy) { 
    history.pushState(null,null,window.location.href);
    this.locationStrategy.onPopState(()=>{
      history.pushState(null,null,window.location.href);
    });
  }

  ngOnInit() {
  }
  logout()
  {
    this.authservice.isLoggedOut();
    this.router.navigateByUrl('login');
  }
}