import { Component, OnInit } from '@angular/core';
import { AssetService } from 'src/app/shared/asset.service';
import { Observable } from 'rxjs';
import { Purchase } from 'src/app/shared/purchase';
import { Assettype } from 'src/app/shared/assettype';
import { Assetdef } from 'src/app/shared/assetdef';
import { Vendor } from 'src/app/shared/vendor';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-purchase-list',
  templateUrl: './purchase-list.component.html',
  styleUrls: ['./purchase-list.component.scss']
})
export class PurchaseListComponent implements OnInit {

  purchase:Observable<Purchase[]>
  assetype:Observable<Assettype[]>
  assetdef:Observable<Assetdef[]>
  vendor:Observable<Vendor[]>
  constructor(private authService:AuthService,private assetService: AssetService,private router:Router,private toastr:ToastrService) { }

  ngOnInit() {
    this.purchaseList();
  }
  purchaseList() {
    
    this.purchase=this.assetService.getPurchaseList();
    this.assetype=this.assetService.getAssettypeList();
   this.assetdef=this.assetService.getAssetList();
   this.vendor=this.assetService.getVendorList();
  }
  logout()
  {
    this.authService.isLoggedOut();
    this.router.navigateByUrl('login');
  }
deleteOrder(id:number){
    this.assetService.cancelOrder(id).subscribe(data => {
      console.log(data);
      this.toastr.info('Order canceled', 'Oops');
      this.purchaseList();
    })

}
}
