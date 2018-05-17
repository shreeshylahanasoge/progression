import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './service/auth.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthGuard implements CanActivate {
 
    constructor(private authService: AuthService, private router: Router) { }
 
    canActivate(): Observable<boolean> {
		return this.checkLogin();
    }
	canActivateChild(): Observable<boolean> {
		return this.checkLogin();
	}
	//authguard can provide an observable rather than a straight boolean
	checkLogin(): Observable<boolean> {
			return this.authService.checkAuth().map(e => {
				console.log("aaaaaaaaaaaaaaa" + e);
				if (e == false) {
					this.router.navigate(['/login']);
					return false;
				}
				return true;
			}).catch(() => {
				console.log("Could not login");
				this.router.navigate(['/login']);
				return Observable.of(false);
			});
	}
}