import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderDetailService } from 'src/app/shared/order-detail.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styles: [
  ]
})
export class OrderHistoryComponent implements OnInit {

  constructor(private router:Router,public service:OrderDetailService,private toastr:ToastrService) { }

  ngOnInit(): void {
    if(localStorage.getItem('token')==null){
      this.router.navigateByUrl('/user/login');
    }
  }
}
