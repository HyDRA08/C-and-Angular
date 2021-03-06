import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styles: [
  ]
})
export class LogoutComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  onLogout(){
    localStorage.removeItem('token');
    this.router.navigate(['/user/login'])
  }
}
