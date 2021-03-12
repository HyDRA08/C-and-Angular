import { Injectable } from '@angular/core';
import { ItemDetail } from './item-detail.model';
import { HttpClient,HttpParams } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Order } from './order.model';
import { UserService } from './user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailService {

  constructor(public fb:FormBuilder, private http:HttpClient) { 
    
  }
  itemDetails: ItemDetail=new ItemDetail();
  paymentSelected:0;
  orderDetails: Order=new Order();
  itemList:Order[];
  payList:Order[];
  orderList:Order[];
  userDetails;
  userID;
  userService:UserService;

  readonly BaseURL='http://localhost:47522/api';
  getPayRoleList(){
    return this.http.get(this.BaseURL + '/Order/PaymentModes')
    .toPromise()
    .then(res=>this.payList = res as Order[]);
  }

  getItemDetails(){
    this.http.get(this.BaseURL +'/Item/GetItems')
    .toPromise()
    .then(res=>this.itemList = res as Order[]);
  }
  postOrderDetails(){
    var body = {
      OrderUserID: this.orderDetails.UserID,
      OrderItemID: this.orderDetails.ItemID,
      // OrderUserID: this.orderDetails.UserEmail,
      isDeleted: 0,
      PayModeID: this.orderDetails.PayModeID
    };

    return this.http.post(this.BaseURL + '/Order/AddOrder', body);
  }
  deleteItemDetails(id){
    return this.http.delete(this.BaseURL + '/Order/DeleteOrder/'+id);
  }

  getOrderHistory(): Observable<any>{
    let params1=new HttpParams().set("UserID","5");
    return this.http.get(this.BaseURL +'/Order/GetOrders',{params:params1})
  }

  completeOrderHistory(): Observable<any>{
    let params1=new HttpParams().set("UserID","5");
    return this.http.get(this.BaseURL +'/Order/GetAllOrders',{params:params1})
  }
}
