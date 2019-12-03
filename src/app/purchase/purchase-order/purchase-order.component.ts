import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { identifierModuleUrl } from '@angular/compiler';
import { element } from 'protractor';
import { Purchase } from 'src/app/shared/purchase';
import { Assetdef } from 'src/app/shared/assetdef';
import { Assettype } from 'src/app/shared/assettype';
import { Vendor } from 'src/app/shared/vendor';
import { AssetService } from 'src/app/shared/asset.service';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.scss']
})
export class PurchaseOrderComponent implements OnInit {
  formPurchase: FormGroup;
  purchase: Purchase = new Purchase();
  Purchases: Observable<Purchase[]>;
  assetdefs: Observable<Assetdef[]>;
  assettype: Observable<Assettype[]>;
  vendors: Observable<Vendor[]>;
  assetId: number;
  constructor(private formbuilder: FormBuilder, private route: Router, private service: AssetService, private authservice: AuthService, private toastr: ToastrService) { }

  ngOnInit() {
    this.formPurchase = this.formbuilder.group({
      purchaseOrderNo: ['OD' + Math.floor((Math.random() * 1152001) + 1), Validators.compose([Validators.required])],
      purchaseAssetName: ['', [Validators.required]],
      purchaseAssetType: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      purchaseVendorName: ['', [Validators.required]]

    });
  }
  searchAsset(name: string) {
    this.assettype = this.service.searchAssettype(name);
    this.service.searchasset(name).subscribe(data => {
      data.forEach(element => {
        this.assetId = element["assetId"];
        console.log(this.assetId);

      });

    })
  }
  onOptionsSelected(value: number) {
    this.vendors = this.service.searchVendor(value);
    this.vendors.subscribe(x => {
      x.forEach(element => {
        console.log(element["vendorName"]);
      })
    })
  }

  placeOrder() {
    this.purchase.purchaseOrderNo = this.formPurchase.controls.purchaseOrderNo.value;
    this.purchase.purchaseAssetName = this.assetId;
    this.purchase.purchaseAssetType = this.formPurchase.controls.purchaseAssetType.value;
    this.purchase.quantity = this.formPurchase.controls.quantity.value;
    this.purchase.purchaseVendorName = this.formPurchase.controls.purchaseVendorName.value;
    this.purchase.purchaseStatus = 'PO-Raised with Supplier';
    this.service.placeorder(this.purchase).subscribe(x => {
      this.toastr.success("Order placed Successfully");
    });


    this.ngOnInit();
    this.route.navigateByUrl('purchaselist');
  }

  logout() {
    this.authservice.isLoggedOut();
    this.route.navigateByUrl('login');
  }


}