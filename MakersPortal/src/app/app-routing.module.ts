import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth/auth.guard';
import { UserlistComponent } from './userlist/userlist.component';
import { ItemlistComponent } from './itemlist/itemlist.component';
import { OrderlistComponent } from './orderlist/orderlist.component';
import { OrderHistoryComponent } from './orderlist/order-history/order-history.component';


const routes: Routes = [
  {path:'',redirectTo:'/user/login',pathMatch:'full'},
  {
      path:'user',component: UserComponent,
      children:[
        {path:'registration',component:RegistrationComponent},
        {path:'login',component:LoginComponent}
      ]
  },
  {path:'dashboard',component:DashboardComponent,canActivate:[AuthGuard]},
  {path:'userlist',component:UserlistComponent},
  {path:'itemlist',component:ItemlistComponent},
  {path:'orderlist',component:OrderlistComponent},
  {path:'orderhistory',component:OrderHistoryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
