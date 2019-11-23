import { Component, OnInit } from '@angular/core';
import { AssetService } from '../shared/asset.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Assetdef } from '../shared/assetdef';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Assettype } from '../shared/assettype';

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
  constructor(private service: AssetService, private router: Router, private formBuilder: FormBuilder, private toastr: ToastrService) { }

  assettypes: String[];

  ngOnInit() {

    this.formAsset = this.formBuilder.group({
      assetName: ['', [Validators.required]],
      assetType:['', [Validators.required]],
      assetClass: ['', [Validators.required]]
    });

   //this.assettype=this.service.getAssettypeList();
   this. getAssetTypes();
   
  }
  

  getAssetTypes(){
    this.assettype=this.service.getAssettypeList();
    console.log(this.assettype)
    console.log("Getting")

    this.service.getAssettypeList().subscribe((response)=>{
      console.log(response)
     this.assettypes=response as String[]
     console.log(this.assettypes)
    });
  }
  addAsset() {
    this.isSubmitted = true;
    if (this.formAsset.invalid) {
      return;
    }
    this.assetdef.assetName = this.formAsset.controls.assetName.value;
    this.assetdef.assetType = this.formAsset.controls.assetType.value;
    this.assetdef.assetClass = this.formAsset.controls.assetClass.value;
    this.service.addAsset(this.assetdef).subscribe();
    this.toastr.success('', 'Asset details added');
  }
}
