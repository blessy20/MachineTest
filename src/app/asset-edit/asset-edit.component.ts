import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Assetdef } from '../shared/assetdef';
import { Router, ActivatedRoute } from '@angular/router';
import { AssetService } from '../shared/asset.service';
import { ToastrService } from 'ngx-toastr';
import { Assettype } from '../shared/assettype';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-asset-edit',
  templateUrl: './asset-edit.component.html',
  styleUrls: ['./asset-edit.component.scss']
})
export class AssetEditComponent implements OnInit {
  formAsset: FormGroup;
  isSubmitted = false;
  assetdef: Assetdef = new Assetdef();
  assettypes: Observable<Assettype[]>;
  constructor(private route:Router,private assetService: AssetService, private router: ActivatedRoute, private formBuilder: FormBuilder, private toastr: ToastrService) { }
  id:number;
  ngOnInit() {
    this.formAsset = this.formBuilder.group({
      assetId: null,
      assetName: ['',[Validators.pattern('[A-Z][a-zA-Z][^#&>/~;$^%{}?]{1,20}$')]],
      assetType: ['',[Validators.required]],
      assetClass: ['',[Validators.required]]
    });

    this.id = this.router.snapshot.params["id"];
    this.assetService.getAsset(this.id).subscribe(data => {
    this.assetdef = data;
    });
    this.assettypes = this.assetService.getAssettypeList();
  }
  get formControls() {
    return this.formAsset.controls;

  }
  updateAsset() {
    this.assetdef.assetId = this.id;
    this.assetdef.assetName = this.formAsset.controls.assetName.value;
    this.assetdef.assetType = this.formAsset.controls.assetType.value;
    this.assetdef.assetClass = this.formAsset.controls.assetClass.value;
    this.assetService.updateAsset(this.id, this.assetdef).subscribe();
    this.toastr.info('Asset details Updated');
    this.route.navigateByUrl("/list");
  }

}
