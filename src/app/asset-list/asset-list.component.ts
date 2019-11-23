import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Assetdef } from '../shared/assetdef';
import { Observable } from 'rxjs';
import { Assettype } from '../shared/assettype';
import { AssetService } from '../shared/asset.service';

@Component({
  selector: 'app-asset-list',
  templateUrl: './asset-list.component.html',
  styleUrls: ['./asset-list.component.scss']
})
export class AssetListComponent implements OnInit {
assetdef:Observable<Assetdef[]>
assettype:Observable<Assettype[]>
  constructor(private toastr:ToastrService,private service:AssetService) { }

  ngOnInit() {
    this.list();
  }
list()
{
  this.assetdef=this.service.getAssetList();
}
deleteAsset(id:number)
{
  this.service.deleteAsset(id).subscribe(data=>{
    console.log(data);
    this.toastr.info('product details deleted','Oops');
  })

}
}
