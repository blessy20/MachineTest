import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Assetdef } from './assetdef';

@Injectable({
  providedIn: 'root'
})
export class AssetService {

  constructor(private http:HttpClient) { }
  private baseUrl="http://localhost:51580/api";
  public getAsset(id:number):Observable<any>
  {
    return this.http.get(this.baseUrl+'/assetdef' +id);
  }
  public getAssetList():Observable<any>
  {
    return this.http.get(this.baseUrl+'/assetdef');
  }
  public addAsset(assetdef:Assetdef)
  {
    return this.http.post(environment.baseUrl+'/assetdef',assetdef);
  }
  public deleteAsset(ad_id:number)
  {
   return this.http.delete(environment.baseUrl+'/assetdef' +ad_id);
  }
}
