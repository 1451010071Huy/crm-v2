
import { Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { RouterModule, Router } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { CustomerComponent } from "./customer/customer.component";
import { CustomerDetailComponent } from "./customer-detail/customer-detail.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

import { FilterPipe } from "./filter.pipe";// search
import { OrderModule } from "ngx-order-pipe";//sort item
import { NgxPaginationModule } from "ngx-pagination";//pagination
import { DateTimePickerModule } from 'ng-pick-datetime';//date time picker
import { LoadingSpinnerComponent } from './ui/loading-spinner/loading-spinner.component';//loading spinner
import { AppComponent } from "./app.component";
import { PurchaseOrderComponent } from './purchase-order/purchase-order.component'
import { SliderModule } from 'primeng/primeng';
import { DataTableModule, SharedModule } from 'primeng/primeng';
import { CalendarModule } from 'primeng/primeng'; // calendar prime
import { CurrencyMaskModule } from "ng2-currency-mask";
import { FileUploadModule } from "ng2-file-upload";

const routesConfig: Routes = [
    { path: '', redirectTo: '/customers', pathMatch: 'full' },
    { path: 'customers', component: CustomerComponent, data: { title: 'Customer' } },
    { path: 'customers/:page', component: CustomerComponent },
    { path: 'customers/detail/:id', component: CustomerDetailComponent, data: { title: 'Detail Customer' } },
    { path: 'purchase-orders', component: PurchaseOrderComponent, data: { title: 'Purchase Orders' } },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routesConfig),
        FormsModule,
        BrowserModule,
        DateTimePickerModule,//Date time picker
        NgxPaginationModule, //pagination page
        OrderModule,//sort item
        SliderModule,
        DataTableModule,
        SharedModule,
        CalendarModule,
        CurrencyMaskModule,
        FileUploadModule
    ],
    declarations: [
        CustomerComponent,
        PurchaseOrderComponent,
        CustomerDetailComponent,
        FilterPipe,//search item
        LoadingSpinnerComponent// icon spinner loading

    ],
    exports: [RouterModule]
})

export class AppRoutingModule { }

