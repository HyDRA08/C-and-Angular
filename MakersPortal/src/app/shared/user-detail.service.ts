import { Injectable } from '@angular/core';
import { UserDetail } from './user-detail.model';
import { RoleDetail } from './role-detail.model';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserDetailService {

  constructor(public fb:FormBuilder, private http:HttpClient) { }
  userData: UserDetail = new UserDetail();
  roleData: RoleDetail = new RoleDetail();
  // userData:UserDetail
  // roleData:RoleDetail
  readonly BaseURL='http://localhost:47522/api/';
  list:RoleDetail[];
  listUser:UserDetail[];

  getRoleList(){
    return this.http.get(this.BaseURL + '/User/Roles')
    .toPromise()
    .then(res=>this.list = res as RoleDetail[]);
  }

  deleteUserDetails(id){
    return this.http.delete(this.BaseURL + '/User/DeleteUser/'+id);
  }
  refreshList(){
    this.http.get(this.BaseURL +'/User/GetUsers')
    .toPromise()
    .then(res=>this.listUser = res as UserDetail[]);
  }
  roleSelected:any;
  isEnabled;

  postUserDetails(){
    var body = {
      UserID: this.userData.UserID,
      UserName: this.userData.UserName,
      Email: this.userData.UserEmail,
      Name: this.userData.FullName,
      Password: this.userData.UserPassword,
      UserRoleID:this.userData.UserRoleID
    };

    return this.http.post(this.BaseURL + '/ApplicationUser/Register', body);
  }

  putUserDetail(){
    return this.http.put(this.BaseURL + '/User/Updateuser',  this.userData);
  }
}
