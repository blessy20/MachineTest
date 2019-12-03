import { Component, OnInit } from '@angular/core';
import { AssetService } from '../shared/asset.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Purchase } from '../shared/purchase';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  purchases: Observable<Purchase[]>;
  constructor(private masterOrderService:AssetService,private authService:AuthService,private router:Router ) { }

  ngOnInit() {
this.reloadData();
  }
reloadData(){
    this.purchases=this.masterOrderService.getAssetOrders();
  }

  Logout(){
    this.authService.isLoggedOut();
    this.router.navigateByUrl('logout');
  }
}
