import { Component, OnInit } from '@angular/core';
import { ItemDetailService } from 'src/app/shared/item-detail.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styles: [
  ]
})
export class ItemDetailComponent implements OnInit {

  constructor(public service:ItemDetailService,private toastr:ToastrService) { }

  ngOnInit(): void {
    // this.service.itemModel.reset();
    this.resetForm();
  }

  resetForm(form?:NgForm){
    if(form!=null)
      form.resetForm();
    this.service.itemModel={
      ItemID:0,
      ItemName:'',
      ItemPrice:''
    }
  }

  onSubmit(form:NgForm){
    if(this.service.itemModel.ItemID==0){
      this.insertItem(form);
    }else{
      this.updateItem(form);
    }
  }

  insertItem(form:NgForm){
    this.service.postItemDetails().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success('New Item Added','Makers Portal');
        this.service.refreshList();
      },
      err => {
        console.log(err)
      }
    )
  }

  updateItem(form:NgForm){
    this.service.putItemDetails().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.info('Item Updated','Makers Portal');
        this.service.refreshList();
      },
      err => {
        console.log(err)
      }
    )
  }
}
