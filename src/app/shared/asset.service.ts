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
  private baseUrl="http://localhost:62800/api";
  public getAsset(id:number):Observable<any>
  {
    return this.http.get(this.baseUrl+'/AssetDefinitions' +id);
  }
  public getAssetList():Observable<any>
  {
    return this.http.get(this.baseUrl+'/AssetDefinitions');
  }
  public addAsset(assetdef:Assetdef)
  {
    return this.http.post(environment.baseUrl+'/AssetDefinitions',assetdef);
  }
  public deleteAsset(id: number)
  {
   return this.http.delete(environment.baseUrl+'/AssetDefinitions/' +id);
  }
  getAssettypeList(): Observable<any> {
    return this.http.get(this.baseUrl+'/ AssetTypes');
  }
  getAssettype(id: number): Observable<any> {
    return this.http.get(this.baseUrl + '/ AssetTypes/' + id);
  }
}
