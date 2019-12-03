import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AssetAddComponent } from './asset-add/asset-add.component';
import { AssetListComponent } from './asset-list/asset-list.component';
import { LoginComponent } from './login/login.component';
import { AssetEditComponent } from './asset-edit/asset-edit.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import {NgxPaginationModule} from 'ngx-pagination';
import { AdminComponent } from './admin/admin.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { VendorAddComponent } from './vendor/vendor-add/vendor-add.component';
import { VendorListComponent } from './vendor/vendor-list/vendor-list.component';
import { VendorEditComponent } from './vendor/vendor-edit/vendor-edit.component';
import { PurchaseOrderComponent } from './purchase/purchase-order/purchase-order.component';
import { PurchaseListComponent } from './purchase/purchase-list/purchase-list.component';
import { PurchaseEditComponent } from './purchase/purchase-edit/purchase-edit.component';
import { AssetmasterAddComponent } from './assetmaster-add/assetmaster-add.component';
import { AssetmasterListComponent } from './assetmaster-list/assetmaster-list.component';
import { OrderListComponent } from './order-list/order-list.component';
@NgModule({
  declarations: [
    AppComponent,
    AssetAddComponent,
    AssetListComponent,
    LoginComponent,
    AssetEditComponent,
    AdminComponent,
    PurchaseComponent,
    VendorAddComponent,
    VendorListComponent,
    VendorEditComponent,
    PurchaseOrderComponent,
    PurchaseListComponent,
    PurchaseEditComponent,
    AssetmasterAddComponent,
    AssetmasterListComponent,
    OrderListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,NgxPaginationModule,
    HttpClientModule,ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger'}),
    ToastrModule.forRoot()
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
