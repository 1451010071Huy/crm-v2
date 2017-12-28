import { Injectable } from "@angular/core"
import { Http, Headers } from "@angular/http"
import { AppSettings } from './url-config';
import 'rxjs/add/operator/map'

@Injectable()
export class PurchaseOrderServices {

    constructor(private http: Http) {
    }
    //get a customers services
    getPurchaseOrder() {
        return this.http.get(AppSettings.API_ENDPOINT + '/api/purchase-orders')
            .map(res => res.json());
    }
    //get a customer services
    getDetailPurchaseOrder(id) {
        return this.http.get(AppSettings.API_ENDPOINT + '/api/purchase-order/detail/' + id)
            .map(res => res.json());
    }
    //add a Purchase Order services
    addPurchaseOrder(newPurchaseOrder) {
        return this.http.post(AppSettings.API_ENDPOINT + '/api/purchase-order', newPurchaseOrder)
            .map(res => res.json());
    }
    //update a Purchase Order services
    updatePurchaseOrder(id, PurchaseOrder) {
        return this.http.put(AppSettings.API_ENDPOINT + '/api/purchase-order/' + id, PurchaseOrder)
            .map(res => res.json());
    }
    //delete a Purchase Order services
    deletePurchaseOrder(id) {
        return this.http.delete(AppSettings.API_ENDPOINT + '/api/purchase-order/' + id)
            .map(res => res.json());
    }

    deleteFilePurchaseOrder(id, fileName) {
        return this.http.delete(AppSettings.API_ENDPOINT + '/api/purchase-order/' + id +'/'+ fileName)
            .map(res => res.json());
    }
}