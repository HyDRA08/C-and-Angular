import { Injectable } from '@angular/core';
import { ItemDetail } from './item-detail.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemDetailService {

  constructor(public fb:FormBuilder, private http:HttpClient) { }
  itemModel:ItemDetail
  readonly BaseURL='http://localhost:47522/api/';
  list : ItemDetail[];
  postItemDetails(){
    return this.http.post(this.BaseURL + '/Item/AddItem', this.itemModel);
  }

  putItemDetails(){
    return this.http.put(this.BaseURL + '/Item/UpdateItem',  this.itemModel);
  }

  deleteItemDetails(id){
    return this.http.delete(this.BaseURL + '/Item/DeleteItem/'+id);
  }

  refreshList(){
    this.http.get(this.BaseURL +'/Item/GetItems')
    .toPromise()
    .then(res=>this.list = res as ItemDetail[]);
  }
}
