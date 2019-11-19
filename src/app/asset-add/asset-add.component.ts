import { Component, OnInit } from '@angular/core';
import { AssetService } from '../shared/asset.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Assetdef } from '../shared/assetdef';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-asset-add',
  templateUrl: './asset-add.component.html',
  styleUrls: ['./asset-add.component.scss']
})
export class AssetAddComponent implements OnInit {
  formAsset: FormGroup;
  isSubmitted = false;
  assetdef: Assetdef = new Assetdef();
  constructor(private service: AssetService, private router: Router, private formBuilder: FormBuilder,private toastr:ToastrService) { }

  ngOnInit() {
    this.formAsset = this.formBuilder.group({
      ad_name: ['', [Validators.required]],
      ad_type_id:null,
      ad_class: ['', [Validators.required]]
    });
  }
  get formControls() {
    return this.formAsset.controls;
  }
  addAsset() {
    this.isSubmitted = true;
    if (this.formAsset.invalid) {
      return;
    }
    this.assetdef.ad_name=this.formAsset.controls.ad_name.value;
    this.assetdef.ad_type_id=this.formAsset.controls.ad_type_id.value;
    this.assetdef.ad_class=this.formAsset.controls.ad_class.value;
    this.service.addAsset(this.assetdef).subscribe();
    this.toastr.success('','Asset details added');
  }
}
