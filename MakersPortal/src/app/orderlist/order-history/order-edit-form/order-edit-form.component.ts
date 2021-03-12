import { Component, OnInit } from '@angular/core';
import { OrderDetailService } from 'src/app/shared/order-detail.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-order-edit-form',
  templateUrl: './order-edit-form.component.html',
  styles: [
  ]
})
export class OrderEditFormComponent implements OnInit {

  constructor(public service:OrderDetailService,private toastr:ToastrService) { }

  ngOnInit(): void {
  }

}
