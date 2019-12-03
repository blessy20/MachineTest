import { Component, OnInit } from '@angular/core';
import { Vendor } from 'src/app/shared/vendor';
import { Observable } from 'rxjs';
import { Assettype } from 'src/app/shared/assettype';
import { ToastrService } from 'ngx-toastr';
import { AssetService } from 'src/app/shared/asset.service';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.scss']
})
export class VendorListComponent implements OnInit {
  vendor:Observable<Vendor[]>;
  assettype:Observable<Assettype[]>;
  constructor(private toastr: ToastrService, private service: AssetService,private authservice:AuthService,private router:Router) { }

  ngOnInit() {
    this.vendorlist();
  }
  vendorlist(){
    this.vendor=this.service.getVendorList();
  }

 deleteVendor(id: number) {
    this.service.deleteVendor(id).subscribe(data => {
      console.log(data);
      this.toastr.info('vendor details deleted');
    })

  }
  search(vendorName:string)
{
  this.vendor=this.service.searchvendor(vendorName);
  if(vendorName=="")
  {
    this.vendor=this.service.getVendorList();
  }
}
  logout()
  {
    this.authservice.isLoggedOut();
    this.router.navigateByUrl('login');
  }
}
