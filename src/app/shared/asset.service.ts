import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Assetdef } from './assetdef';
import { Vendor } from './vendor';
import { Purchase } from './purchase';
import { Assetmaster } from './assetmaster';

@Injectable({
  providedIn: 'root'
})
export class AssetService {

  constructor(private http: HttpClient) { }
  private baseUrl = "http://localhost:62800/api";

  public getAsset(id: number): Observable<any> {
    return this.http.get(this.baseUrl + '/AssetDefinitions/' + id);
  }
  public getAssetList(): Observable<any> {
    return this.http.get(this.baseUrl + '/AssetDefinitions');
  }
  public addAsset(assetdef: Assetdef) {
    return this.http.post(environment.baseUrl + '/AssetDefinitions', assetdef);
  }
  public deleteAsset(id: number) {
    return this.http.delete(environment.baseUrl + '/AssetDefinitions/' + id);
  }
  getAssettypeList(): Observable<any> {
    return this.http.get(this.baseUrl + '/AssetTypes');
  }
  getAssettype(id: number): Observable<any> {
    return this.http.get(this.baseUrl + '/AssetTypes/' + id);
  }
  updateAsset(id: number, assetdef: Assetdef) {
    return this.http.put(this.baseUrl + '/AssetDefinitions/' + id, assetdef);
  }
  searchasset(name: string): Observable<any> {
    return this.http.get(this.baseUrl + '/AssetDefinitions?name=' + name);
  }


  public getVendor(id: number): Observable<any> {
    return this.http.get(this.baseUrl + '/Vendors/' + id);
  }
  public getVendorList(): Observable<any> {
    return this.http.get(this.baseUrl + '/Vendors');
  }
  searchvendor(name: string): Observable<any> {
    return this.http.get(this.baseUrl + '/Vendors?name=' + name);
  }
  public deleteVendor(id: number) {
    return this.http.delete(environment.baseUrl + '/Vendors/' + id);
  }
  updateVendor(id: number, vendor: Vendor) {
    return this.http.put(this.baseUrl + '/Vendors/' + id, vendor);
  }
  addVendor(vendor: Vendor) {
    return this.http.post(this.baseUrl + '/Vendors', vendor);
  }
  
  public getPurchaseList(): Observable<any> {
    return this.http.get(this.baseUrl + '/Purchases');
  }
  public getPurchase(id: number): Observable<any> {
    return this.http.get(this.baseUrl + '/Purchases?pid=' +id);
  }
  public placeorder(purchase: Purchase) {
    return this.http.post(this.baseUrl + '/Purchases', purchase);
  }
  searchAssettype(name: string): Observable<any> {
    return this.http.get(this.baseUrl + '/Purchases?name=' + name);
  }
  searchVendor(id: number): Observable<any> {
    return this.http.get(this.baseUrl + '/Purchases/' + id);
  }
  updateOrder(id: number, purchase: Purchase) {
    return this.http.put(this.baseUrl + '/Purchases/' + id, purchase);
  }
  public cancelOrder(id: number) {
    return this.http.delete(environment.baseUrl + '/Purchases/' + id);
  }


  getAssetOrders(): Observable<any>{
    return this.http.get(this.baseUrl+'/Order');
  }

  getAssetOrder(id:string): Observable<any>{
    return this.http.get(this.baseUrl+'/Order?ordno='+id);
  }

  postAsset(asset: Assetmaster){
    return this.http.post(this.baseUrl+'/AssetMasters',asset);
  }

  updatePurchase(id:number, purchase: Purchase): Observable<any>{
    return this.http.put(this.baseUrl+'/AssetMasters/'+ id, purchase);
  }

  getMasterList(): Observable<any>{
    return this.http.get(this.baseUrl+'/AssetMasters');
  }
}
