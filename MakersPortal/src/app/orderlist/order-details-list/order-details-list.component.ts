import { Component, OnInit } from '@angular/core';
import { OrderDetailService } from 'src/app/shared/order-detail.service';
import { Order } from 'src/app/shared/order.model';

@Component({
  selector: 'app-order-details-list',
  templateUrl: './order-details-list.component.html',
  styles: [
  ]
})
export class OrderDetailsListComponent implements OnInit {

  constructor(public service:OrderDetailService) { }

  ngOnInit(): void {
    this.service.getItemDetails();
  }

  populateForm(pd:Order){
    // alert(this.service.itemModel.ItemName);
    // this.service.orderDetails=Object.assign({},pd);
    this.service.orderDetails.ItemID=pd.ItemID;
    this.service.orderDetails.ItemName=pd.ItemName;
    this.service.orderDetails.ItemPrice=pd.ItemPrice;
    // this.service.orderDetails.UserID=5;
  }

}
