import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: []
})
export class UserlistComponent implements OnInit {

  constructor(private router:Router,private service:UserService) { }

  ngOnInit(): void {
    if(localStorage.getItem('token')==null){
      this.router.navigateByUrl('/user/login');
    }
  }

  onLogout(){
    localStorage.removeItem('token');
    this.router.navigate(['/user/login'])
  }

}
