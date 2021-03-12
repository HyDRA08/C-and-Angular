import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OrderDetailService } from 'src/app/shared/order-detail.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styles: [
  ]
})
export class OrderDetailComponent implements OnInit {

  constructor(public service:OrderDetailService,public userService:UserService,private toastr:ToastrService) { }
  // paymentSelected:0;
  UserDetails:any;
  userID:any;
  isDisabled;
  ngOnInit(): void {
    this.service.getPayRoleList();
    this.userService.getUserProfile().subscribe(
      res =>{
        this.UserDetails=res;
        this.service.orderDetails.UserID=this.UserDetails.UserID;
      },
      err=>{
        console.log(err);
      }
    )
  }

  resetForm(form?:NgForm){
    if(form!=null)
      form.resetForm();
    this.service.orderDetails={
      UserID:0,
      ItemName:'',
      ItemPrice:'',
      PayModeID:0,
      PaymentType:'',
      isDeleted:0,
      OrderID:0,
      ItemID:0,
      UserName:'',
    }
  }

  getPayModeID(val:any){
    // alert(val);
    this.service.paymentSelected=val;
    this.service.orderDetails.PayModeID=val;
  }

  onSubmit(form:NgForm){
    // this.service.UserDetails.UserID=this.userID;
    this.insertItem(form);
  }

  insertItem(form:NgForm){
    // this.userService.getUserProfile().subscribe(
    //   res =>{
    //     this.UserDetails=res;
    //     this.service.orderDetails.UserID=this.UserDetails.UserID;
    //   },
    //   err=>{
    //     console.log(err);
    //   }
    // )

    this.service.postOrderDetails().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success('New Order Added','Makers Portal');
        // this.service.refreshList();
      },
      err => {
        console.log(err)
      }
    )
  }
}
