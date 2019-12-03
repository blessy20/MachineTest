import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { AssetService } from '../shared/asset.service';
import { Observable } from 'rxjs';
import { Assetmaster } from '../shared/assetmaster';

@Component({
  selector: 'app-assetmaster-list',
  templateUrl: './assetmaster-list.component.html',
  styleUrls: ['./assetmaster-list.component.scss']
})
export class AssetmasterListComponent implements OnInit {
  masters: Observable<Assetmaster[]>;

  constructor(private authService:AuthService,private router:Router,private masterService:AssetService) { }

  ngOnInit() {
    this.reloadData();
  }
  reloadData(){
    this.masters=this.masterService.getMasterList();

  }

  Logout(){
    this.authService.isLoggedOut();
    this.router.navigateByUrl('logout');
  }

}
