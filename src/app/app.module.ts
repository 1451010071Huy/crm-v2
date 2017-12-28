import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpModule } from "@angular/http";
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms'
import { CustomerService } from "./services/customer.service";
import { PurchaseOrderServices } from "./services/purchase-order.services";
import { ToastModule } from 'ng2-toastr/ng2-toastr'; // Toast mgs
import { NavbarComponent } from './navbar/navbar.component';
import { AppRoutingModule } from "./app-routing.module";
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PurchaseOrderComponent } from "./purchase-order/purchase-order.component"
import { DateTimePickerModule } from 'ng-pick-datetime';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PageNotFoundComponent,
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,//use Toast
    ToastModule.forRoot(),//use Toast
    AppRoutingModule
  ],
  providers: [CustomerService, PurchaseOrderServices],
  bootstrap: [AppComponent]
})
export class AppModule { }
