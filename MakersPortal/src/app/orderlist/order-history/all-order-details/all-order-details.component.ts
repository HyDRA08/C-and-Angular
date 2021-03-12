import { Component, OnInit } from '@angular/core';
import { OrderDetailService } from 'src/app/shared/order-detail.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-all-order-details',
  templateUrl: './all-order-details.component.html',
  styles: [
  ]
})
export class AllOrderDetailsComponent implements OnInit {

  constructor(public service:OrderDetailService,private toastr:ToastrService) { }
  isDeleted;
  ngOnInit(): void {
    this.service.completeOrderHistory().subscribe(
      res=>{
        this.service.orderList=res;
        // this.isDeleted=this.service.orderList
      }
    )
  }

}
