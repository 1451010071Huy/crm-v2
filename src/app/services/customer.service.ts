import { Injectable } from "@angular/core"
import { Http, Headers } from "@angular/http"
import { AppSettings } from './url-config';
import 'rxjs/add/operator/map'

@Injectable()
export class CustomerService {

    constructor(private http: Http) {
    }
    //get a customers services
    getCustomers() {
        return this.http.get(AppSettings.API_ENDPOINT + '/api/customers')
            .map(res => {
              //  console.log(res)
                return res.json()
            
            });
    }
    //get a customer services
    getDetailCustomer(id) {
        return this.http.get(AppSettings.API_ENDPOINT + '/api/customer/detail/' + id)
            .map(res => res.json());
    }
    //add a customer services
    addCustomer(newCustomer) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(AppSettings.API_ENDPOINT + '/api/customer', newCustomer, { headers: headers })
            .map(res => res.json());
    }

    //update a customer services
    updateCustomer(id, customer) {
        return this.http.put(AppSettings.API_ENDPOINT + '/api/customer/' + id, customer)
            .map(res => res.json());
    }
    //delete a customer services
    deleteCustomer(id) {
        return this.http.delete(AppSettings.API_ENDPOINT + '/api/customer/' + id)
            .map(res => res.json());
    }
}