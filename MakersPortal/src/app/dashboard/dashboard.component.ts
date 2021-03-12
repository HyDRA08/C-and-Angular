import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: []
})
export class DashboardComponent implements OnInit {
  isAdmin ;
  isMaker;
  userDetails;
  constructor(private router:Router,private service:UserService) { }

  ngOnInit(){
    if(localStorage.getItem('token')==null){
      this.router.navigateByUrl('/user/login');
    }


    this.service.getUserProfile().subscribe(
      res =>{
        this.userDetails=res;
        if (this.userDetails.UserRoleID==1) {
          this.isAdmin=true;
          this.isMaker=true;
        }else if(this.userDetails.UserRoleID==2){
          this.isAdmin=false;
          this.isMaker=true;
        }else{
          this.isAdmin=false;
          this.isMaker=false;
        }
      },
      err=>{
        console.log(err);
      }
    )
  }
  
  // onLogout(){
  //   localStorage.removeItem('token');
  //   this.router.navigate(['/user/login'])
  // }
  // navUserList(){
  //   this.router.navigate(['/userlist'])
  // }
}
