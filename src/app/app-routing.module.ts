import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AssetListComponent } from './asset-list/asset-list.component';
import { AssetAddComponent } from './asset-add/asset-add.component';
import { AssetEditComponent } from './asset-edit/asset-edit.component';
import { AdminComponent } from './admin/admin.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { VendorListComponent } from './vendor/vendor-list/vendor-list.component';
import { VendorAddComponent } from './vendor/vendor-add/vendor-add.component';
import { VendorEditComponent } from './vendor/vendor-edit/vendor-edit.component';
import { AuthGuard } from './auth.guard';
import { PurchaseListComponent } from './purchase/purchase-list/purchase-list.component';
import { PurchaseOrderComponent } from './purchase/purchase-order/purchase-order.component';
import { PurchaseEditComponent } from './purchase/purchase-edit/purchase-edit.component';
import { AssetmasterListComponent } from './assetmaster-list/assetmaster-list.component';
import { AssetmasterAddComponent } from './assetmaster-add/assetmaster-add.component';
import { OrderListComponent } from './order-list/order-list.component';


const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'admin',component:AdminComponent, canActivate: [AuthGuard]},
  {path:'list',component:AssetListComponent, canActivate: [AuthGuard]},
  {path:'add',component:AssetAddComponent, canActivate: [AuthGuard]},
  {path:'update/:id',component:AssetEditComponent, canActivate: [AuthGuard]},
  {path:'vendorlist',component:VendorListComponent, canActivate: [AuthGuard]},
  {path:'vendoradd',component:VendorAddComponent, canActivate: [AuthGuard]},
  {path:'vendorupdate/:id',component:VendorEditComponent, canActivate: [AuthGuard]},
  {path:'purchase',component:PurchaseComponent, canActivate: [AuthGuard]},
  {path:'purchaselist',component:PurchaseListComponent, canActivate: [AuthGuard]},
  {path:'placeorder',component:PurchaseOrderComponent, canActivate: [AuthGuard]},
  {path:'purchaseupdate/:id',component:PurchaseEditComponent, canActivate: [AuthGuard]},
  {path:'masterorderlist',component:OrderListComponent, canActivate: [AuthGuard]},
  {path:'masterlist',component:AssetmasterListComponent, canActivate: [AuthGuard]},
  {path:'assetmaster/:id',component:AssetmasterAddComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
