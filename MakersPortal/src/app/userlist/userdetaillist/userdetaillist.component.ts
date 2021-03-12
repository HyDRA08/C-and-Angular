import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserDetailService } from 'src/app/shared/user-detail.service';
import { UserDetail } from 'src/app/shared/user-detail.model';

@Component({
  selector: 'app-userdetaillist',
  templateUrl: './userdetaillist.component.html',
  styles: [
  ]
})
export class UserdetaillistComponent implements OnInit {

  constructor(public service:UserDetailService,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.service.refreshList();
  }

  onDelete(UserID){
    if (confirm("Are You Sure to delete this User?")) {
      this.service.deleteUserDetails(UserID).subscribe(
        res => {
          this.service.refreshList();
          this.toastr.warning('User Deleted Successfully', 'Makers Portal');
        },
        err => {
          console.log(err);
        }
      )
    }
  }

  populateForm(pd:UserDetail){
    // alert(this.service.itemModel.ItemName);
    this.service.userData=Object.assign({},pd);
    this.service.userData.RoleID=pd.RoleID;
    this.service.userData.UserName=pd.UserName;
    this.service.userData.FullName=pd.FullName;
    this.service.userData.UserEmail=pd.UserEmail;
    this.service.roleSelected=pd.RoleID;
    // this.service.roleData.RoleID=pd.UserRoleID;
    // this.service.isEnabled=false;
    // this.service.userData.
    // this.service.userData.UserPassword
  }
  
}
