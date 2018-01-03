import { Injectable } from "@angular/core"
import { Http, Headers } from "@angular/http"

import 'rxjs/add/operator/map'

@Injectable()
export class EmployeServices {

    constructor(private http: Http) {
    }
    //get a employees services
    getEmployees() {
        return this.http.get('https://fptiscrm.herokuapp.com/api/employees')
            .map(res => {
                return res.json()
            });
    }
}