import { Injectable } from '@angular/core';
import {Http, Response, RequestOptions, Headers } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
@Injectable()
export class AuthService {
	constructor(private http: Http) {};
	auth: boolean;
	
	checkAuth(): Observable<any> {
    	const url = 'http://www.mindlounge.in/reactor/index.php';
		return this.http.post(url, JSON.stringify({"action": "CHECKAUTH"}), {withCredentials: true})
			.map(response => {
			//console.log("res");
				//console.log(JSON.parse(response['_body']));
				var decoded_response_data;
				decoded_response_data = JSON.parse(response['_body']);
				if (decoded_response_data['auth'] == 1) {
					return true;
				} else {
					return false;
				}
			});
	}
	login(u: string, p: string): Observable<any> {
    	const url = 'http://www.mindlounge.in/reactor/index.php';
		return this.http.post(url, JSON.stringify({"action": "LOGIN", "data": {"user": u, "pass":p}}), {withCredentials: true})
			.map(response => {
				var decoded_response_data;
				decoded_response_data = JSON.parse(response['_body']);
				if(decoded_response_data['auth'] == 1) {
					return true;
				} else {
					return false;
				}
			}).catch(() => {
				console.log("Could not login");
				return Observable.of(false);
			});
	}
}