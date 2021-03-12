import { Component, OnInit } from '@angular/core';
import { ItemDetailService } from 'src/app/shared/item-detail.service';
import { ItemDetail } from 'src/app/shared/item-detail.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-item-details-list',
  templateUrl: './item-details-list.component.html',
  styles: [
  ]
})
export class ItemDetailsListComponent implements OnInit {

  constructor(public service:ItemDetailService,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.service.refreshList();
    // alert(this.service.refreshList.arguments)
  }

  populateForm(pd:ItemDetail){
    // alert(this.service.itemModel.ItemName);
    this.service.itemModel=Object.assign({},pd);
  }

  onDelete(ItemID) {
    if (confirm("Are You Sure to delete this Item?")) {
      this.service.deleteItemDetails(ItemID).subscribe(
        res => {
          this.service.refreshList();
          this.toastr.warning('Item Deleted Successfully', 'Makers Portal');
        },
        err => {
          console.log(err);
        }
      )
    }
  }
}
