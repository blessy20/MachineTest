import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Purchase } from 'src/app/shared/purchase';
import { Observable } from 'rxjs';
import { Assetdef } from 'src/app/shared/assetdef';
import { Assettype } from 'src/app/shared/assettype';
import { Vendor } from 'src/app/shared/vendor';
import { Router, ActivatedRoute } from '@angular/router';
import { AssetService } from 'src/app/shared/asset.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-purchase-edit',
  templateUrl: './purchase-edit.component.html',
  styleUrls: ['./purchase-edit.component.scss']
})
export class PurchaseEditComponent implements OnInit {
  formPurchase: FormGroup;
  purchase: Purchase = new Purchase();
  Purchases: Observable<Purchase[]>;
  assetdefs: Observable<Assetdef[]>;
  assettype: Observable<Assettype[]>;
  vendors: Observable<Vendor[]>;
  id: number;
 
  constructor(private formbuilder:FormBuilder,private router:ActivatedRoute,private assetService:AssetService,private route:Router,private toastr:ToastrService) { }

  ngOnInit() {
    this.formPurchase = this.formbuilder.group({
      purchaseId:'null',
      purchaseOrderNo: ['',[Validators.required]],
      purchaseAssetNamestr: ['', [Validators.required]],
      purchaseAssetTypestr: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      purchaseVendorNamestr: ['', [Validators.required]],
      purchaseDatestr: [[Validators.required]],
      purchaseDelivDatestr: ['', [Validators.required]],

  });
  this.id = this.router.snapshot.params["id"];
  this.assetService.getPurchase(this.id).subscribe(data => {
    this.purchase = data;
  });
}
get formControls() {
  return this.formPurchase.controls;
}
updateOrder() {
  this.purchase.purchaseId = this.id;
  this.purchase.purchaseOrderNo = this.formPurchase.controls.purchaseOrderNo.value;
  this.purchase.purchaseAssetName = this.formPurchase.controls.purchaseAssetNamestr.value;
  this.purchase.purchaseAssetType = this.formPurchase.controls.purchaseAssetTypestr.value;
  this.purchase.quantity = this.formPurchase.controls.quantity.value;
  this.purchase.purchaseVendorName = this.formPurchase.controls.purchaseVendorNamestr.value;
  this.purchase.purchaseDate = this.formPurchase.controls.purchaseDatestr.value;
  this.purchase.purchaseDelivDate = this.formPurchase.controls.purchaseDelivDatestr.value;
  this.purchase.purchaseStatus = 'Asset Details Registered Internally';
  if(this.purchase.purchaseDate<this.purchase.purchaseDelivDate)
  {
    this.assetService.updateOrder(this.id,this.purchase).subscribe(res=>{
      this.toastr.success("Order details updated");
      this.route.navigateByUrl('purchaselist');
    });
   
  }
  else{
    this.toastr.error("Ordered date must be less than delivery date");
  }
  
}
}
