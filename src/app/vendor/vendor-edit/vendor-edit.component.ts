import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Vendor } from 'src/app/shared/vendor';
import { Observable } from 'rxjs';
import { Assettype } from 'src/app/shared/assettype';
import { AssetService } from 'src/app/shared/asset.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-vendor-edit',
  templateUrl: './vendor-edit.component.html',
  styleUrls: ['./vendor-edit.component.scss']
})
export class VendorEditComponent implements OnInit {
  formVendor: FormGroup;
  vendor: Vendor = new Vendor();
  assettype: Observable<Assettype[]>;
  id: number;
  constructor(private formBuilder: FormBuilder, private assetService: AssetService, private toastr: ToastrService,
  private router: ActivatedRoute,private route:Router) { }

  ngOnInit() {
    this.assettype = this.assetService.getAssettypeList();
    this.formVendor = this.formBuilder.group({
      vendorId:null,
      vendorName: ['', [Validators.required]],
      vendorType: 'Suppiler',
      vendorAssetType: ['',[Validators.required]],
      validFrom: ['',[Validators.required]],
      vaildTo: ['',[Validators.required]],
      vendorAddress: ['', [Validators.required]]
    });
    this.id = this.router.snapshot.params["id"];
    this.assetService.getVendor(this.id).subscribe(data => {
      this.vendor = data;
    });
  }
  get formControls() {
    return this.formVendor.controls;
  }
  updateVendor() {
    this.vendor.vendorId = this.id;
    this.vendor.vendorName = this.formVendor.controls.vendorName.value;
    this.vendor.vendorType = this.formVendor.controls.vendorType.value;
    this.vendor.vendorAssetType = this.formVendor.controls.vendorAssetType.value;
    this.vendor.validFrom = this.formVendor.controls.validFrom.value;
    this.vendor.vaildTo = this.formVendor.controls.vaildTo.value;
    this.vendor.vendorAddress = this.formVendor.controls.vendorAddress.value;
    this.assetService.updateVendor(this.id, this.vendor).subscribe();
    this.toastr.success("Vendor details updated");
    this.route.navigateByUrl("/vendorlist");
    
  }

}
