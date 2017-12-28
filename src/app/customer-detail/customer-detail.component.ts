import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, ParamMap } from "@angular/router";
import { CustomerService } from "../services/customer.service";
import { Customer } from "../object/customer";
import { ToastsManager,ToastOptions } from "ng2-toastr/ng2-toastr";

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {
  showSpinner: boolean = true;//Show loading spinner
  title: string = "detail customer";
  customer: Customer;
  id: string = '';
  chiNhanh: string[] = ["Cần Thơ", "Đồng Nai", "Bình Dương", "Đà Lạt"]
  donviKD: string[] = ["BA", "MNS", "TSM"]
  constructor(private route: ActivatedRoute, private customerService: CustomerService, public toastr: ToastsManager, vcr: ViewContainerRef,toastOption: ToastOptions) {
    this.route.paramMap.subscribe((params: ParamMap) =>
      this.id = params.get('id'));
    this.toastr.setRootViewContainerRef(vcr);
    toastOption.animate = 'flyRight'; // you can override any options available
    toastOption.showCloseButton = true;
    toastOption.positionClass = 'toast-top-right';
    toastOption.maxShown = 3;
  }

  ngOnInit() {
    this.getDetailCustomer(this.id)
  }
  getDetailCustomer(id) {
    this.customerService.getDetailCustomer(id)
      .subscribe(customer => {
        //console.log(customer);//print customer
        this.customer = customer;
      });
    this.customerService.getDetailCustomer(id).subscribe(() => this.showSpinner = false)
  }
  updateCustomer(_id): void {
    this.customerService.updateCustomer(_id, this.customer)
      .subscribe(data => {
        this.customer[_id] = this.customer[_id];
        this.showSuccess();
      })
  }
  showSuccess() {
    this.toastr.success('Success!', 'Update');
  }

}
