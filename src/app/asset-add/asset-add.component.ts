import { Component, OnInit } from '@angular/core';
import { AssetService } from '../shared/asset.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Assetdef } from '../shared/assetdef';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Assettype } from '../shared/assettype';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-asset-add',
  templateUrl: './asset-add.component.html',
  styleUrls: ['./asset-add.component.scss']
})
export class AssetAddComponent implements OnInit {
  formAsset: FormGroup;
  isSubmitted = false;
  assetdef: Assetdef = new Assetdef();
  assetdefs: Observable<Assetdef[]>;
  assettype: Observable<Assettype[]>;
  assetForm: FormGroup;
  assettypes: Observable<Assettype[]>;
  
  constructor(private service: AssetService, private router: Router, private formBuilder: FormBuilder, private toastr: ToastrService, private authService: AuthService) { }

  ngOnInit() {
    this.assettypes = this.service.getAssettypeList();
    this.formAsset = this.formBuilder.group({
      assetName: ['', Validators.required,Validators.pattern('[A-Z][a-zA-Z][^#&>/~;$^%{}?]{1,20}$')],
      assetType: ['', [Validators.required]],
      assetClass: ['', [Validators.required]]
    });
  }
  get formControls() {
    return this.formAsset.controls;
  }

  addAsset() {
   
    if (this.formAsset.invalid) {
      return;
    }
    this.assetdef.assetName = this.formAsset.controls.assetName.value;
    this.assetdef.assetType = this.formAsset.controls.assetType.value;
    this.assetdef.assetClass = this.formAsset.controls.assetClass.value;
    this.service.addAsset(this.assetdef).subscribe(data => {
      if(data==0)
      {
        this.toastr.success('Asset details added', '');

      }
      else{
        this.toastr.error("Asset already exist")
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



