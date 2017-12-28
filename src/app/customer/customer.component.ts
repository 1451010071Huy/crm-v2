import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { Customer } from "../object/customer";
import { ToastsManager, ToastOptions } from "ng2-toastr/ng2-toastr";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})

export class CustomerComponent implements OnInit {
  @ViewChild('closeBtn') closeBtn: ElementRef;

  order: string = "TenDayDu";

  searchText: string = "";
  showSpinner: boolean = true;//Show loading spinner
  showRefresh: boolean = true;////Show loading refresh
  ascending: boolean = true;//icon sort Ho va Ten

  itemsPerPage: number = 5;
  p: number = 1;// currentPage default

  customers: Customer[];
  customer = new Customer;
  
  chiNhanh: string[] = ["Cần Thơ", "Đồng Nai", "Bình Dương", "Đà Lạt"]
  donviKD: string[] = ["BA", "MNS", "TSM"]

  constructor(private activatedRoute: ActivatedRoute, private customerService: CustomerService,
    public toastr: ToastsManager, vcr: ViewContainerRef, toastOption: ToastOptions, private router: Router) {
    this.toastr.setRootViewContainerRef(vcr);
    toastOption.animate = 'flyRight'; // you can override any options available
    toastOption.showCloseButton = true;
    toastOption.positionClass = 'toast-bottom-right';
    toastOption.maxShown = 3;
    this.p = activatedRoute.snapshot.params['page'] //set Param cho currentPage
  }
  ngOnInit() {
    this.getCustomers();
  }
  getCustomers() {
    this.showRefresh = true;
    this.customerService.getCustomers()
      .subscribe(customers => {
        this.customers = customers;
        this.showRefresh = false;
        this.showSpinner = false
      });
  }

  //add a Customer
  addCustomer() {
    this.showSpinner = true;
    this.customerService.addCustomer(this.customer)
      .subscribe(customer => {
        this.customers.push(customer);
        this.getCustomers();
        this.closeModal();//close form modal create a customer
        this.showSpinner = false;
        this.toastr.success('Create', 'Success!');
      });

  }

  //delete customer
  deleteCustomer(id: any): void {
    var customers = this.customers;
    let answer = confirm("Are you sure you want to delete this item?");
    if (answer) {
      this.customerService.deleteCustomer(id)
        .subscribe(data => {
          if (data.n == 1)
            for (var i = 0; i < customers.length; i++)
              if (customers[i]._id == id) {
                customers.splice(i, 1);
                this.toastr.error('Delete', 'Success!');
              }
        })
    }
  }

  //get value form input create new a customer
  private closeModal(): void {
    this.closeBtn.nativeElement.click();
  }
 
  //change sort by icon
  ChangeAscending() {
    this.ascending = !this.ascending;
  }

  goToCurrenPage(currentPage) {
    this.router.navigate(['/customers/', currentPage]);
  }

  getFieldOrderBy(fieldName: string){
    this.order = fieldName;
  }
  //validate input
}
