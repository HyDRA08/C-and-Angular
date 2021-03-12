import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { UserService } from './shared/user.service';
import { LoginComponent } from './user/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserlistComponent } from './userlist/userlist.component';
import { ItemlistComponent } from './itemlist/itemlist.component';
import { OrderlistComponent } from './orderlist/orderlist.component';
import { UserdetailsComponent } from './userlist/userdetails/userdetails.component';
import { UserdetaillistComponent } from './userlist/userdetaillist/userdetaillist.component';
import { UserDetailService } from './shared/user-detail.service';
import { ItemDetailComponent } from './itemlist/item-detail/item-detail.component';
import { ItemDetailsListComponent } from './itemlist/item-details-list/item-details-list.component';
import { ItemDetailService } from './shared/item-detail.service';
import { LogoutComponent } from './logout/logout.component';
import { OrderDetailComponent } from './orderlist/order-detail/order-detail.component';
import { OrderDetailsListComponent } from './orderlist/order-details-list/order-details-list.component';
import { OrderHistoryComponent } from './orderlist/order-history/order-history.component';
import { OrderListsComponent } from './orderlist/order-history/order-lists/order-lists.component';
import { AllOrderDetailsComponent } from './orderlist/order-history/all-order-details/all-order-details.component';
import { OrderEditFormComponent } from './orderlist/order-history/order-edit-form/order-edit-form.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    RegistrationComponent,
    LoginComponent,
    DashboardComponent,
    UserlistComponent,
    ItemlistComponent,
    OrderlistComponent,
    UserdetailsComponent,
    UserdetaillistComponent,
    ItemDetailComponent,
    ItemDetailsListComponent,
    LogoutComponent,
    OrderDetailComponent,
    OrderDetailsListComponent,
    OrderHistoryComponent,
    OrderListsComponent,
    AllOrderDetailsComponent,
    OrderEditFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FormsModule
  ],
  providers: [UserService,UserDetailService,ItemDetailService],
  bootstrap: [AppComponent]
})
export class AppModule { }
