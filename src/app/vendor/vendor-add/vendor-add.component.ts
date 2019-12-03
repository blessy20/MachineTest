import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Vendor } from 'src/app/shared/vendor';
import { Observable } from 'rxjs';
import { Assettype } from 'src/app/shared/assettype';
import { AssetService } from 'src/app/shared/asset.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendor-add',
  templateUrl: './vendor-add.component.html',
  styleUrls: ['./vendor-add.component.scss']
})
export class VendorAddComponent implements OnInit {
  formVendor: FormGroup;
  vendor: Vendor = new Vendor();
  assettype: Observable<Assettype[]>;
  constructor(private formBuilder: FormBuilder, private assetService: AssetService, private toastr: ToastrService,
    private authService:AuthService,private router:Router) { }

  ngOnInit() {
    this.assettype = this.assetService.getAssettypeList();
    this.formVendor = this.formBuilder.group({
      vendorName: ['',  Validators.required,Validators.pattern('[A-Z][a-zA-Z][^#&>/~;$^%{}?]{1,20}$')],
      vendorType: 'Suppiler',
      vendorAssetType: ['', [Validators.required]],
      validFrom: ['', [Validators.required]],
      vaildTo: ['', [Validators.required]],
      vendorAddress: ['',  Validators.required,Validators.pattern('[A-Z][a-zA-Z][^#&>/~;$^%{}?]{1,20}$')]
    });
  }
  get formControls() {
    return this.formVendor.controls;
  }
  VendorAdd() {
    if (this.formVendor.invalid) {
      return;
    }
    this.vendor.vendorName = this.formVendor.controls.vendorName.value;
    this.vendor.vendorType = this.formVendor.controls.vendorType.value;
    this.vendor.vendorAssetType = this.formVendor.controls.vendorAssetType.value;
    this.vendor.validFrom = this.formVendor.controls.validFrom.value;
    this.vendor.vaildTo = this.formVendor.controls.vaildTo.value;
    this.vendor.vendorAddress = this.formVendor.controls.vendorAddress.value;
    this.assetService.addVendor(this.vendor).subscribe(data => {
      if (data == 0) {
        this.toastr.success("vendor details added");
      }
      else {
        this.toastr.error("vendor already exist");
      }
    });
    this.ngOnInit();
  }
  logout()
  {
    this.authService.isLoggedOut();
    this.router.navigateByUrl('login');
  }
}
