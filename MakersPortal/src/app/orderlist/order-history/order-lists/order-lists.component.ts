import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderDetailService } from 'src/app/shared/order-detail.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-order-lists',
  templateUrl: './order-lists.component.html',
  styles: [
  ]
})
export class OrderListsComponent implements OnInit {

  constructor(private router:Router,public service:OrderDetailService,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.service.getOrderHistory().subscribe(
      res=>{
        this.service.orderList=res;
      }
    )
  }

  onDelete(OrderID){
    if (confirm("Are You Sure to delete this Order?")) {
      this.service.deleteItemDetails(OrderID).subscribe(
        res => {
          this.service.getOrderHistory();
          this.toastr.warning('Order Deleted Successfully', 'Makers Portal');
        },
        err => {
          console.log(err);
        }
      )
    }
  }

}
