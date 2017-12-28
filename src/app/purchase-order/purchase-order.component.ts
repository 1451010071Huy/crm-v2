import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef } from '@angular/core';
import { PurchaseOrderServices } from '../services/purchase-order.services';
import { PurchaseOrder } from "../object/purchase-order";
import { ToastsManager, ToastOptions } from "ng2-toastr/ng2-toastr";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { FormGroup } from '@angular/forms';
import { DateTimePickerModule } from 'ng-pick-datetime';
import { FileUploader } from 'ng2-file-upload';
import { AppSettings } from '../services/url-config'//config url localhost: http://localhost:3000
import { CustomerService } from "../services/customer.service";
import { Customer } from '../object/customer';
import { Input } from '@angular/core/src/metadata/directives';

declare var $: any;//using jquery
@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.css'],

})

export class PurchaseOrderComponent implements OnInit {
  valYear: number = 0;
  valMonth: number = 0;
  showSpinner: boolean = false;
  searchText: string = "";
  public uploader: FileUploader = new FileUploader({ url: AppSettings.API_ENDPOINT + '/api/purchase-order/upload/' });
  customers: Customer[];
  purchaseOrders: PurchaseOrder[];
  purchaseOrder2 = new PurchaseOrder;
  purchaseOrder = new PurchaseOrder;
  index: number = 0;
  uploadedFiles: any;

  disabledBtnUpdate: boolean = true;
  showFormAdd: boolean = false;
  showFormEdit: boolean = false;
  total: number;

  hasData = false;
  arr: Array<any>;
  data: Array<any>;
  object: Object;
  constructor(private customerService: CustomerService, private purchaseOrderServices: PurchaseOrderServices, private toastr: ToastsManager, vcr: ViewContainerRef, private toatOps: ToastOptions) {
    toatOps.positionClass = "toast-top-right";
    toatOps.animate = "flyRight";
    this.toastr.setRootViewContainerRef(vcr);
    this.uploader.onSuccessItem = (item, response, status) => {
      //console.log("Received");
      this.uploadedFiles = JSON.parse(response).obj.FileHopDong;

    }

    this.uploader.onCompleteAll = () => {
      //console.log(this.uploadedFiles);// show file new
      this.purchaseOrders[this.purchaseOrders.length - 1].FileHopDong = this.uploadedFiles;
    }

  }

  ngOnInit() {
    //fix loi the value of the 'Access-Control-Allow-Origin' 
    this.uploader.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
    }
    this.getPurchaseOrder();
    this.getCustomers();
    this.data = [];
  }
  getCustomers() {
    this.customerService.getCustomers()
      .subscribe(customers => {
        this.customers = customers;
      });
  }
  getPurchaseOrder() {
    this.purchaseOrderServices.getPurchaseOrder()
      .subscribe(purchaseOrders => {
        this.purchaseOrders = purchaseOrders
      });

  }
  //mở file hợp đồng
  open(path) {
    window.open(AppSettings.API_ENDPOINT + '/' + path, '_blank').focus();
  }

  //update Purchase Order
  updatePurchaseOrder(_id): void {

    if (_id != undefined) {
      this.showSpinner = true;
      this.purchaseOrderServices.updatePurchaseOrder(_id, this.purchaseOrder2)
        .subscribe(data => {
          this.purchaseOrders[_id] = this.purchaseOrder2[_id];
          this.getPurchaseOrder();
          this.toastr.success('Cập nhật hợp đồng ' + this.purchaseOrder2.SoHopDong, 'Thành công');
          this.showSpinner = false;
        })
    } else {
      alert("Bạn chưa có hợp đồng nào");
    }

  }

  //add new purchase order
  addPurchaseOrder() {
    this.showSpinner = true;
    if (this.valYear) {
      this.SaveKyThanhToan();
    }
    this.purchaseOrderServices.addPurchaseOrder(this.purchaseOrder)
      .subscribe(response => {
        var purchaseOrder = response.record;
        this.purchaseOrders.push(purchaseOrder);
        this.uploader.setOptions({
          url: AppSettings.API_ENDPOINT + '/api/purchase-order/upload/' + purchaseOrder._id
        });
        //console.log(this.uploader.options.url.toString());
        this.uploader.uploadAll();
        this.uploader.onCompleteAll = () => {
          this.toastr.success('Tạo hợp đồng ' + purchaseOrder.SoHopDong, 'Thành công!');
          this.uploader.clearQueue();
          this.getPurchaseOrder();
        };

        this.showSpinner = false;
        this.purchaseOrder = new PurchaseOrder;
      });
  }
  deletePurchaseOrders(id: any): void {
    let temp;
    let answer = confirm("Are you sure you want to delete this item?");
    if (answer) {
      this.purchaseOrderServices.deletePurchaseOrder(id)
        .subscribe((data) => {
          for (var i = 0; i < this.purchaseOrders.length; i++) {
            if (this.purchaseOrders[i]._id == id) {
              temp = this.purchaseOrders[i].SoHopDong;
              this.purchaseOrders.splice(i, 1)
              break;
            }
          }
          this.toastr.success('Đã xóa hợp đồng' + ' ' + temp, 'Thành công!');
          this.purchaseOrder2 = new PurchaseOrder;
          this.disabledBtnUpdate = true;
        })
    }

  }
  setItem(id) {
    this.purchaseOrder2._id = this.purchaseOrders[id]._id;
    this.purchaseOrder2.SoHopDong = this.purchaseOrders[id].SoHopDong;
    this.purchaseOrder2.NgayKy = this.purchaseOrders[id].NgayKy;
    this.purchaseOrder2.NgayBatDau = this.purchaseOrders[id].NgayBatDau;
    this.purchaseOrder2.NgayKetThuc = this.purchaseOrders[id].NgayKetThuc;
    this.purchaseOrder2.GiaTriHopDong = this.purchaseOrders[id].GiaTriHopDong;
    this.purchaseOrder2.KyThanhToan = this.purchaseOrders[id].KyThanhToan;

    this.purchaseOrder2.KhachHang = this.purchaseOrders[id].KhachHang;
    this.purchaseOrder2.NguoiLienHe = this.purchaseOrders[id].NguoiLienHe;
    this.purchaseOrder2.DiaChi = this.purchaseOrders[id].DiaChi;
    this.purchaseOrder2.AM = this.purchaseOrders[id].AM;
    this.purchaseOrder2.NoiDungHopDong = this.purchaseOrders[id].NoiDungHopDong;
    this.purchaseOrder2.FileHopDong = this.purchaseOrders[id].FileHopDong;
    this.purchaseOrder2.ThongTinKhac = this.purchaseOrders[id].ThongTinKhac;
    this.showFormEdit = true;
    this.showFormAdd = false;
    this.disabledBtnUpdate = false;
  }
  ShowFormAdd() {
    this.showFormAdd = true;
    this.showFormEdit = false;
  }
  HideFormAdd() {
    this.showFormAdd = false;
  }

  uploadAll() {
    this.uploader.uploadAll();
  }
  openNav() {
    $('#mySidenav').css("width", "250px");
    $('#main').css("marginRight", "250px");
  }

  closeNav() {
    $('#mySidenav').css("width", "0");
    $('#main').css("marginRight", "0");
  }

  GanKhachHang(customer) {
    if (this.showFormAdd)
      this.purchaseOrder.KhachHang = customer;
    else if (this.showFormEdit)
      this.purchaseOrder2.KhachHang = customer;
    this.closeNav();
  }

  SaveKyThanhToan() {
    this.purchaseOrder.KyThanhToan = { year: this.valYear, values: this.data };
    this.toastr.info("Lưu thành công");
  }
  getArrayOf(year) {
    this.arr = new Array(year);
    for (let i = 0; i < year; i++) {
      this.arr[i] = new Array(12)
      for (let j = 0; j < 12; j++) {
        this.arr[i][j] = "";
      }
    }
    return this.arr;
  }

  TaoKyThanhToan() {
    this.data = new Array(this.valYear)
    for (var i = 0; i < this.valYear; i++) {

      this.data[i] = [{ value: 0 }, { value: 0 }, { value: 0 }, { value: 0 },
      { value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }, { value: 0 },
      { value: 0 }, { value: 0 }, { value: 0 },]
    }
  }

  //Tính tổng tiền từng tháng của kỳ thanh toán
  calculate(data) {
    return data.reduce((total, item) => total + item.value, 0)
  }

  //Xóa từng file hợp đồng
  deleteFileItem(id, fileName) {
    let answer = confirm("Are you sure you want to delete this item?");
    if (answer) {
      this.purchaseOrderServices.deleteFilePurchaseOrder(id, fileName).subscribe(data => {
        this.purchaseOrder2.FileHopDong.splice(this.purchaseOrder2.FileHopDong.findIndex(file => file.filename === fileName), 1)
      });
    }
  }
} 
