import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: []
})
export class OrderlistComponent implements OnInit {

  constructor(private router:Router,private service:UserService) { }

  ngOnInit(): void {
    if(localStorage.getItem('token')==null){
      this.router.navigateByUrl('/user/login');
    }
  }

}
