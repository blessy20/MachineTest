import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Assetdef } from '../shared/assetdef';
import { Observable } from 'rxjs';
import { Assettype } from '../shared/assettype';
import { AssetService } from '../shared/asset.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-asset-list',
  templateUrl: './asset-list.component.html',
  styleUrls: ['./asset-list.component.scss']
})
export class AssetListComponent implements OnInit {
  assetdef: Observable<Assetdef[]>
  assettype: Observable<Assettype[]>
  constructor(private toastr: ToastrService, private service: AssetService,private authservice:AuthService,private router:Router) { }

  ngOnInit() {
    this.list();
  }
  list() {
    this.assetdef = this.service.getAssetList();
    this.assettype=this.service.getAssettypeList();
  }
  deleteAsset(id: number) {
    this.service.deleteAsset(id).subscribe(data => {
      console.log(data);
      this.toastr.info('asset details deleted');
    })

  }
  search(assetName:string)
{
  this.assetdef=this.service.searchasset(assetName);
  if(assetName=="")
  {
    this.assetdef=this.service.getAssetList();
  }
}
  logout()
  {
    this.authservice.isLoggedOut();
    this.router.navigateByUrl('login');
  }
  onOptionsSelected(value:number)
{
  console.log("The selected value is" +value);
  if(value==0)
  {
    this.assetdef=this.service.getAssetList();
  }
  else{
    this.assetdef=this.service.getAssettype(value);
  }
}
}
