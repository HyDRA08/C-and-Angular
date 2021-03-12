import { Component, OnInit } from '@angular/core';
import { UserDetailService } from 'src/app/shared/user-detail.service';
import { UserService } from 'src/app/shared/user.service';
import { NgForm } from '@angular/forms';
import { ItemDetailService } from 'src/app/shared/item-detail.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styles: [
  ]
})
export class UserdetailsComponent implements OnInit {

  constructor(public service:UserDetailService,private toastr:ToastrService) { }
  
  // roleSelected=0;
  ngOnInit(): void {
    this.service.getRoleList();
    this.resetForm();
  }

  getRoleID(val:any){
    //alert(val);
    this.service.roleSelected=val;
    this.service.userData.UserRoleID=val;
  }

  onSubmit(form:NgForm){
    if(this.service.userData.UserID==0){
      this.insertUser(form);
    }else{
      this.updateUser(form);
    }
  }

  resetForm(form?:NgForm){
    if(form!=null)
      form.resetForm();
    this.service.userData={
      UserID:0,
      UserName:'',
      FullName:'',
      UserEmail:'',
      UserPassword:'',
      UserRoleID:0,
      RoleName:'',
      RoleID:0
    }
  }
  

  insertUser(form:NgForm){
    this.service.postUserDetails().subscribe(
      (res: any) => {
        if (res.Succeeded) {
          this.resetForm(form);
          // this.service.userData.reset();
          console.log('Success');
          this.toastr.success('New user created!', 'Registration successful.');
          this.service.refreshList();
        } else {
        
          // res.errors.forEach(element => {
          //   switch (element.code) {
          //     case 'DuplicateUserName':
          //       this.toastr.error('Username is already taken','Registration failed.');
          //       break;

          //     default:
          //     this.toastr.error(element.description,'Registration failed.');
          //       break;
          //   }
          // });
          console.log('Error s');
          // console.log(res.errors.forEach);
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  updateUser(form:NgForm){
    this.service.putUserDetail().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.info('User Details Updated','Makers Portal');
        this.service.refreshList();
      },
      err => {
        console.log(err)
      }
    )
  }

  isActive(){

  }
}
