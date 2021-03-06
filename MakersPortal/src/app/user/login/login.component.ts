import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent implements OnInit {
  formModel = 
    {
      UserName : '',
      Password : ''
    }
  
  constructor(private service:UserService,private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    if(localStorage.getItem('token')!=null){
      this.router.navigateByUrl('/dashboard');
    }
  }

  onSubmit(form: NgForm) {
    this.service.login(form.value).subscribe(
      (res: any) => {
        localStorage.setItem('token',res.token);
        this.router.navigateByUrl('/dashboard');
      },
      err=>{
        if(err.status == 400){
          this.toastr.error("Incorrect Username or Password");
        }else{
          console.log(err);
        }
      }
    )
  }
}
